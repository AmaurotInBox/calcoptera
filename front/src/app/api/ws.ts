import { v4 as uuid } from 'uuid'

export interface IWSCallbacks {
  onWsOpen?: () => void
  onWsClose?: () => void
  onErrorClose?: (err?: any) => void
  onWsMessage?: () => void // колбек на любое сообщение
  onWSEvent?: (eventData: IResWsReply | null) => void // колбек на событие без запроса
}

export interface IResWsReply<U = any> {
  id: string
  type: string
  data: U
  error?: string
  status?: number
}

export type TReqParams = Record<string, unknown> | undefined

export type TReqEnterWs = Record<string, unknown> & {
  type: string
  data?: TReqParams
}

type TReqWs = TReqEnterWs & {
  id: string
}

interface Callback<U = any> {
  id: string
  f: (data: IResWsReply<U>) => void
  reject: (reason?: any) => void
}

export class Ws extends WebSocket {
  constructor(
    url: string,
    params: IWSCallbacks = {},
    private callbacks: Map<string, Callback> = new Map(),
    private needClose: boolean = false,
  ) {
    super(url)

    Object.setPrototypeOf(this, Ws.prototype)

    this.onopen = () => {
      if (this.needClose) {
        super.close()
        return
      }

      if (params.onWsOpen) {
        params.onWsOpen()
      }
    }

    this.onclose = () => {
      if (this.needClose) {
        if (params.onWsClose) {
          params.onWsClose()
        }
      } else if (params.onErrorClose) {
        /**
         * Если сокет был закрыт по другим причинам,
         * отличным от закрытия сокета в коде или по событию, отправленному сервером
         */
        params.onErrorClose()
      }
      for (const [cbId, cb] of this.callbacks) {
        cb.reject({
          status: '500',
          error: 'Connection was closed',
        } as unknown as IResWsReply)
        this.callbacks.delete(cbId)
      }
    }

    this.onmessage = (res: MessageEvent<string>) => {
      if (params.onWsMessage) {
        params.onWsMessage()
      }

      const data: IResWsReply | null = res.data ? JSON.parse(res.data) : null

      if (data) {
        const callback = this.callbacks.get(data.id)

        if (callback) {
          callback.f({ ...data })
          this.callbacks.delete(data.id)
        } else {
          if (params.onWSEvent) {
            params.onWSEvent(data)
          }
        }
      }
    }

    this.onerror = (err) => {
      if (params.onErrorClose) {
        params.onErrorClose(err)
      }
    }
  }

  close(code?: number, reason?: string): void {
    this.needClose = true
    super.close(code, reason)
  }

  sendRequest<U>(req: TReqEnterWs, waitResponse = true): Promise<U> {
    if (this.readyState === this.CLOSED || this.readyState === this.CLOSING) {
      return Promise.reject({ code: '500', message: 'Connection was closed' })
    }

    return new Promise((resolve, reject) => {
      const requestId = uuid()

      const fullReq: TReqWs = {
        id: requestId,
        ...req,
      }

      if (waitResponse) {
        const callback: Callback<U> = {
          id: requestId,
          f: (data) => {
            if (data.error) {
              console.error('data', data.error)
              reject(data)
            } else {
              let dataRes: U

              if (data.data) {
                dataRes = data.data
              } else {
                dataRes = data as unknown as U
              }

              resolve(dataRes)
            }
          },
          reject,
        }

        this.callbacks.set(requestId, callback)
      }

      super.send(JSON.stringify(fullReq))

      if (!waitResponse) {
        resolve('ok' as U)
      }
    })
  }
}
