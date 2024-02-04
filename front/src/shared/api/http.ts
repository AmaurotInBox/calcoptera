import { HttpError } from './HttpError'

export const fetchHttpRequest = async <U = any>({
  prefix = '',
  url,
  method,
  body,
  params,
}: {
  prefix?: string
  url: string
  method: 'GET' | 'POST'
  body?: any
  params?: Record<string, string>
}) => {
  const paramsStr = params ? '&' + new URLSearchParams(params).toString() : ''

  const urlCorrect = prefix + url + paramsStr

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(urlCorrect, fetchOptions)
  let resJSON: any
  try {
    resJSON = await response.json()
  } catch {
    throw new Error('Incorrect JSON')
  }

  if (!response.ok) {
    if (resJSON.errors) {
      const errors = resJSON.errors as string[]

      throw new HttpError(response.status, errors)
    }
    throw new HttpError(response.status, [response.statusText])
  }

  if (resJSON.data) {
    return resJSON.data as U
  }

  return resJSON as U
}
