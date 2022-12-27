import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { RecommenderSponsorService } from '@/data/services/recommender-service'
import { SimilarityCalculatorService } from '@/data/services/similarity-calculator-service'
import { RecommenderSponsorInterface } from '@/domain/features/recommender-service'
import { TfidCalculatorService } from '@/infra/natural/tfidf-calculator-service'
import { VectorService } from '@/infra/vector-object/vector-service'
import { HttpResponse } from '../helpers/http'
import { Controller } from '@/application/controllers/controller'
import * as trainedData from '../../infra/_prepared_data/prepared_data_sponsor_salic.json'

const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    data
  }
}

export class RecommenderController extends Controller {
  constructor (
    private readonly recommenderSponsorService: RecommenderSponsorInterface
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    const recommendationParam = {
      id: httpRequest.sponsor_id,
      trainedData: trainedData
    }
    const sponsorRecommendation = await this.recommenderSponsorService.perform({ ...recommendationParam })
    return ok(sponsorRecommendation)
  }
}

describe('recommender-controller', () => {
  let vectorService: VectorService
  let tfidfDependency: TfidCalculatorService
  let documentToVector: DocumentToVectorTransformer
  let similarityCalculator: SimilarityCalculatorService
  let recommenderSponsorService: RecommenderSponsorService
  let sut: RecommenderController

  beforeEach(() => {
    vectorService = new VectorService()
    tfidfDependency = new TfidCalculatorService()
    documentToVector = new DocumentToVectorTransformer(tfidfDependency, vectorService)
    similarityCalculator = new SimilarityCalculatorService()
    recommenderSponsorService = new RecommenderSponsorService(documentToVector, similarityCalculator)
    sut = new RecommenderController(recommenderSponsorService)
  })

  it('should return 200 if perform method succeeds', async () => {
    const httpResponse = await sut.perform({
      sponsor_id: '1b4799bfab614f027f9682b50f1783c64d57f32ef15ccc4909fbd570da9a'
    })

    expect(httpResponse).toHaveProperty('statusCode')
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toHaveProperty('data')
    expect(httpResponse.data).toHaveProperty('similarSponsors')
    expect(httpResponse.data.similarSponsors.length).toBe(5)
  })
})
