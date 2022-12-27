import { TfIdf } from 'natural'
import Vector from 'vector-object'

import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { RecommenderSponsorService } from '@/data/services/recommender-service'
import { SimilarityCalculator } from '@/data/services/similarity-calculator-service'

type SutTypes = {
  recommenderService: RecommenderSponsorService
}

interface VectorServiceInterface {
  create: (object: object) => any
}

class VectorService implements VectorServiceInterface {
  create (object: object): any {
    return new Vector(object)
  }
}

const makeSut = (): SutTypes => {
  const vectorService = new VectorService()
  const tfidfDependency = new TfIdf()
  const documentToVector = new DocumentToVectorTransformer(tfidfDependency, vectorService)
  const similarityCalculator = new SimilarityCalculator()
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
