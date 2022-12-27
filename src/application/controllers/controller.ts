import { HttpResponse } from '../helpers/http'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    return await this.perform(httpRequest)
  }
}
