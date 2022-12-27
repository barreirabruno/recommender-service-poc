import { RecommenderSponsorInterface, RecommenderSponsorNamespace } from '@/domain/features/recommender-service'
import { DocumentToVectorTransformer } from './document-to-vector-transformer-service'
import { SimilarityCalculatorService } from './similarity-calculator-service'

export class RecommenderSponsorService implements RecommenderSponsorInterface {
  constructor (private readonly documentToVectorTransformer: DocumentToVectorTransformer,
    private readonly calculateSimilarity: SimilarityCalculatorService) {}

  async perform (params: RecommenderSponsorNamespace.Input): Promise<RecommenderSponsorNamespace.Output> {
    const docToVector = this.documentToVectorTransformer.perform({ processedDocument: [{ id: 'any_sponsor_id', content: 'any_sponsor_content' }] })
    const similarityCalculator = this.calculateSimilarity.perform(docToVector)

    return {
      sponsor: {
        ...params
      },
      ...similarityCalculator
    }
  }
}
