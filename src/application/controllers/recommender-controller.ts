import { RecommenderSponsorInterface } from '@/domain/features/recommender-service'
import { HttpResponse, ok } from '../helpers/http'
import { Controller } from './controller'
import * as trainedData from '@/infra/_prepared_data/prepared_data_sponsor_salic.json'
import { infoLogger } from '@/infra/logger/logger'

export class RecommenderController extends Controller {
  constructor (
    private readonly recommenderSponsorService: RecommenderSponsorInterface
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    infoLogger('[RecommenderController][perform]')
    const recommendationParam = {
      id: httpRequest.sponsor_id,
      trainedData: trainedData
    }
    const sponsorRecommendation = await this.recommenderSponsorService.perform({ ...recommendationParam })
    return ok(sponsorRecommendation)
  }
}
