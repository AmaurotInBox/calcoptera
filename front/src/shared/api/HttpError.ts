export class HttpError extends Error {
  statusCode: number
  messages: string[]

  constructor(statusCode: number, messages: string[]) {
    super(messages[0])
    this.statusCode = statusCode
    this.messages = messages
  }
}
