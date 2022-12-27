import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { RecommenderSponsorService } from '@/data/services/recommender-service'
import { SimilarityCalculatorService } from '@/data/services/similarity-calculator-service'
import { TfidCalculatorService } from '@/infra/natural/tfidf-calculator-service'
import { VectorService } from '@/infra/vector-object/vector-service'
import * as testData from '../../infra/_prepared_data/prepared_data_sponsor_salic.json'

type SutTypes = {
  recommenderService: RecommenderSponsorService
}

const makeSut = (): SutTypes => {
  const vectorService = new VectorService()
  const tfidfDependency = new TfidCalculatorService()
  const documentToVector = new DocumentToVectorTransformer(tfidfDependency, vectorService)
  const similarityCalculator = new SimilarityCalculatorService()
  return {
    recommenderService: new RecommenderSponsorService(documentToVector, similarityCalculator)
  }
}

describe('recommender-service', () => {
  test('should return a list of sponsors based on a root sponsor', async () => {
    const { recommenderService } = makeSut()
    const result = await recommenderService.perform({ id: 'b61ed613a8b87d8eb6749071abb0ab18dae201d0cd69f1b8e284c44b125a', trainedData: testData })
    expect(result).toHaveProperty('sponsor')
    expect(result).toHaveProperty('similarSponsors')
  })
})
