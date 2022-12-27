import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { RecommenderSponsorService } from '@/data/services/recommender-service'
import { SimilarityCalculatorService } from '@/data/services/similarity-calculator-service'
import { TfidCalculatorService } from '@/infra/natural/tfidf-calculator-service'
import { VectorService } from '@/infra/vector-object/vector-service'

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
    const result = await recommenderService.perform({ id: 'any_sponsor_id', trainedData: {} })
    expect(result).toHaveProperty('sponsor')
    expect(result).toHaveProperty('0')
    expect(result).toHaveProperty('1')
    expect(result).toHaveProperty('2')
  })
})
