import { AvailableSponsorInterface, AvailableSponsorNamespace } from '@/domain/features/available-sponsor-service'
import HttpClientAxios from '@/infra/http/axios-http-client'

export default class AvailableSponsorService implements AvailableSponsorInterface {
  constructor (
    private readonly httpClient: HttpClientAxios
  ) {}

  async perform (params: AvailableSponsorNamespace.Input): Promise<AvailableSponsorNamespace.Output> {
    const { id } = params
    const httpRespone = await this.httpClient.request({
      url: 'any_url',
      method: 'get',
      body: {
        id
      }
    })
    return {
      availableSponsors: httpRespone.body
    }
  }
}
