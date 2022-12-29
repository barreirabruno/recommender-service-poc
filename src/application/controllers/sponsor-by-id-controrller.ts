import SponsorByIdService from '@/data/services/sponsor-by-id-service'
import { infoLogger } from '@/infra/logger/logger'
import { HttpResponse, ok } from '../helpers/http'
import { Controller } from './controller'

export default class SponsorByIdController extends Controller {
  constructor (
    private readonly sponsorbyIdService: SponsorByIdService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    infoLogger('[AvailableSponsorController][perform]')
    const sponsorByIdService = await this.sponsorbyIdService.perform({ id: httpRequest.id })
    return ok(sponsorByIdService)
  }
}
