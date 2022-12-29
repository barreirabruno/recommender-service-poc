import AvailableSponsorController from '@/application/controllers/available-sponsor-controller'
import AvailableSponsorService from '@/data/services/available-sponsor-service'
import HttpClientAxios from '@/infra/http/axios-http-client'

export const makeAvailableSponsorsController = (): AvailableSponsorController => {
  const httpClient = new HttpClientAxios()
  const availableSponsorService = new AvailableSponsorService(httpClient)
  return new AvailableSponsorController(availableSponsorService)
}
