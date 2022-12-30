import { ServerError } from '@/domain/models/errors/server-error'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    data
  }
}

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})
