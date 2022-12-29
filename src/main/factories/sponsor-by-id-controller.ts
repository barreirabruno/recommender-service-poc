import SponsorByIdController from '@/application/controllers/sponsor-by-id-controrller'
import SponsorByIdService from '@/data/services/sponsor-by-id-service'
import HttpClientAxios from '@/infra/http/axios-http-client'

export const makeSponsorByIdController = (): SponsorByIdController => {
  const httpClient = new HttpClientAxios()
  const availableSponsorService = new SponsorByIdService(httpClient)
  return new SponsorByIdController(availableSponsorService)
}
