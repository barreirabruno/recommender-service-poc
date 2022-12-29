import { AvailableSponsorInterface, AvailableSponsorNamespace } from '@/domain/features/available-sponsor-service'
import HttpClientAxios from '@/infra/http/axios-http-client'

class AvailableSponsorService implements AvailableSponsorInterface {
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

type SutTypes = {
  axiosHttpClient: HttpClientAxios
  availableSponsor: AvailableSponsorService
}

const makeSut = (): SutTypes => {
  const httpClient = new HttpClientAxios()
  return {
    axiosHttpClient: httpClient,
    availableSponsor: new AvailableSponsorService(httpClient)
  }
}

describe('available-sponsor-service', () => {
  it('should return all available sponsors id in prepared-data', async () => {
    const { availableSponsor, axiosHttpClient } = makeSut()
    jest.spyOn(axiosHttpClient, 'request').mockResolvedValueOnce({
      statusCode: 200,
      body: [
        {
          nome: 'any_sponsor_name_salic',
          cgccpf: 'any_sponsor_cgccpf',
          total_doado: 0
        }
      ]
    })
    const response = await availableSponsor.perform({ id: 'any_id' })
    expect(response).toHaveProperty('availableSponsors')
    response.availableSponsors.map((sponsor) => {
      expect(sponsor).toHaveProperty('nome')
      expect(sponsor).toHaveProperty('cgccpf')
      expect(sponsor).toHaveProperty('total_doado')
      return null
    })
  })
})