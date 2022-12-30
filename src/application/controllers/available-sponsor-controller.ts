import AvailableSponsorService from '@/data/services/available-sponsor-service'
import { infoLogger } from '@/infra/logger/logger'
import { HttpResponse, ok } from '../helpers/http'
import { Controller } from './controller'

import * as preparedData from '@/infra/_prepared_data/prepared_data_sponsor_salic.json'

export default class AvailableSponsorController extends Controller {
  constructor (
    private readonly availableSponsorsService: AvailableSponsorService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    infoLogger('[AvailableSponsorController][perform]')
    const availableSponsors = await this.availableSponsorsService.perform({ preparedData: preparedData })
    return ok(availableSponsors)
  }
}
