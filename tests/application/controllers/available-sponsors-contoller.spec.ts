import AvailableSponsorService from '@/data/services/available-sponsor-service'
import HttpClientAxios from '@/infra/http/axios-http-client'
import AvailableSponsorController from '@/application/controllers/available-sponsor-controller'

describe('available-sponsors-contoller.spec', () => {
  let httpClient: HttpClientAxios
  let availableSponsorService: AvailableSponsorService
  let sut: AvailableSponsorController

  beforeEach(() => {
    httpClient = new HttpClientAxios()
    availableSponsorService = new AvailableSponsorService(httpClient)
    sut = new AvailableSponsorController(availableSponsorService)
  })

  it('should return 200 if perform method succeeds', async () => {
    jest.spyOn(availableSponsorService, 'perform').mockResolvedValue({
      availableSponsors: [
        {
          idSalic: 'NONE_FROM_SALIC',
          nome: 'NONE_FROM_SALIC',
          cgccpf: 'NONE_FROM_SALIC',
          total_doado: 0
        }
      ]
    })

    const httpResponse = await sut.perform({})

    expect(httpResponse).toHaveProperty('statusCode')
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toHaveProperty('data')
    expect(httpResponse.data).toHaveProperty('availableSponsors')
    expect(httpResponse.data.availableSponsors.length).toBe(1)
  })
})
