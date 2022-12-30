import HttpClientAxios from '@/infra/http/axios-http-client'
import SponsorByIdService from '@/data/services/sponsor-by-id-service'
import SponsorByIdController from '@/application/controllers/sponsor-by-id-controrller'

describe('sponsor-id-controller', () => {
  let httpClient: HttpClientAxios
  let availableSponsorService: SponsorByIdService
  let sut: SponsorByIdController

  beforeEach(() => {
    httpClient = new HttpClientAxios()
    availableSponsorService = new SponsorByIdService(httpClient)
    sut = new SponsorByIdController(availableSponsorService)
  })

  it('should return 200 if perform method succeeds', async () => {
    jest.spyOn(availableSponsorService, 'perform').mockResolvedValue({
      idSalic: 'ANY_SALIC_SPONSOR_ID',
      nome: 'ANY_SALIC_SPONSOR_NOME',
      cgccpf: 'ANY_SALIC_SPONSOR_CGCCPF',
      total_doado: 0
    })

    const httpResponse = await sut.perform({ id: 'ANY_VALID_SPONSOR_ID' })

    expect(httpResponse).toHaveProperty('statusCode')
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toHaveProperty('data')
    expect(httpResponse.data).toEqual({
      idSalic: 'ANY_SALIC_SPONSOR_ID',
      nome: 'ANY_SALIC_SPONSOR_NOME',
      cgccpf: 'ANY_SALIC_SPONSOR_CGCCPF',
      total_doado: 0
    })
  })
})
