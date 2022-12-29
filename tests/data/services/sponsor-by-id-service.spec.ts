import HttpClientAxios from '@/infra/http/axios-http-client'
import SponsorByIdService from '@/data/services/sponsor-by-id-service'

type SutTypes = {
  axiosHttpClient: HttpClientAxios
  sponsorById: SponsorByIdService
}

const makeSut = (): SutTypes => {
  const httpClient = new HttpClientAxios()
  return {
    axiosHttpClient: httpClient,
    sponsorById: new SponsorByIdService(httpClient)
  }
}

const salicHttpResponse = {
  nome: 'ANY_SPONSOR_HTTP_RESPONSE',
  cgccpf: '00546997000180',
  total_doado: 2905150.12,
  _links: {
    doacoes: 'http://api.salic.cultura.gov.br/v1/incentivadores/5afec5523308eb0d860f5f568c31bedd7268cb38ea27d861b6327cbdd8ef/doacoes',
    self: 'http://api.salic.cultura.gov.br/v1/incentivadores/ANY_ID_FOR_TEST'
  },
  tipo_pessoa: 'juridica',
  responsavel: 'José Rubens Blasi Carvalho Rosas',
  UF: 'SP',
  municipio: 'Paulina'
}

describe('sponsor-by-id-service.spec', () => {
  it('should return a sponsor by id', async () => {
    const { sponsorById, axiosHttpClient } = makeSut()
    jest.spyOn(axiosHttpClient, 'request').mockResolvedValue({
      statusCode: 200,
      body: salicHttpResponse
    })
    const response = await sponsorById.perform({ id: '1b4799bfab614f027f9682b50f1783c64d57f32ef15ccc4909fbd570da9a' })
    expect(response).toHaveProperty('idSalic')
    expect(response).toHaveProperty('nome')
    expect(response).toHaveProperty('cgccpf')
    expect(response).toHaveProperty('total_doado')
  })
})
