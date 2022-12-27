import { RecommenderSponsorInterface, RecommenderSponsorNamespace } from '@/domain/features/recommender-service'
import { Sponsor } from '@/domain/models/sponsor'

class DataToVectorTransformer {
  perform (processedDocument: Sponsor[]): any {
    return [
      {
        id: 'any_sponsor_idA',
        vector: { vector: ['any_object'] }
      },
      {
        id: 'any_sponsor_idB',
        vector: { vector: ['any_object'] }
      },
      {
        id: 'any_sponsor_idC',
        vector: { vector: ['any_object'] }
      }
    ]
  }
}

class SimilarityCalculator {
  perform (vectorData: any): any {
    return [
      {
        id: 'any_sponsor_idA',
        score: 0.8795587357647578
      },
      {
        id: 'any_sponsor_idB',
        score: 0.7818452786316625
      },
      {
        id: 'any_sponsor_idC',
        score: 0.7609400405953574
      }
    ]
  }
}

class RecommenderSponsorService implements RecommenderSponsorInterface {
  constructor (private readonly dataToVectorTransformer: DataToVectorTransformer,
    private readonly calculateSimilarity: SimilarityCalculator) {}

  async perform (params: RecommenderSponsorNamespace.Input): Promise<RecommenderSponsorNamespace.Output> {
    const docToVector = this.dataToVectorTransformer.perform([{ id: 'any_sponsor_id', content: 'any_sponsor_content' }])
    const similarityCalculator = this.calculateSimilarity.perform(docToVector)

    return {
      ...similarityCalculator
    }
  }
}

type SutTypes = {
  recommenderService: RecommenderSponsorService
}

const makeSut = (): SutTypes => {
  const documentToVector = new DataToVectorTransformer()
  const similarityCalculator = new SimilarityCalculator()
  return {
    recommenderService: new RecommenderSponsorService(documentToVector, similarityCalculator)
  }
}

describe('recommender-service', () => {
  test('should return a list of sponsors based on a root sponsor', async () => {
    const { recommenderService } = makeSut()
    const result = await recommenderService.perform({ id: 'any_sponsor_id', trainedData: {} })
    expect(result).toHaveProperty('0')
    expect(result).toHaveProperty('1')
    expect(result).toHaveProperty('2')
  })
})
