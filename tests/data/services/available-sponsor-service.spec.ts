import HttpClientAxios from '@/infra/http/axios-http-client'
import AvailableSponsorService from '@/data/services/available-sponsor-service'

const preparedData = {
  sponsors_prepared: [
    {
      id: 'ANY_ID_FOR_TEST',
      content: 'Artes Cenicas'
    }
  ]
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

const salicHttpResponse = {
  nome: 'Galvani Industria Comércio e Serviço Ltda.',
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

describe('available-sponsor-service', () => {
  it('should return all available sponsors id in prepared-data', async () => {
    const { availableSponsor, axiosHttpClient } = makeSut()
    jest.spyOn(axiosHttpClient, 'request').mockResolvedValue({
      statusCode: 200,
      body: salicHttpResponse
    })
    const response = await availableSponsor.perform({ preparedData })
    expect(response).toHaveProperty('availableSponsors')
    response.availableSponsors.map((sponsor) => {
      expect(sponsor).toHaveProperty('idSalic')
      expect(sponsor).toHaveProperty('nome')
      expect(sponsor).toHaveProperty('cgccpf')
      expect(sponsor).toHaveProperty('total_doado')
      return null
    })
  })
})
