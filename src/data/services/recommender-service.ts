import { RecommenderSponsorInterface, RecommenderSponsorNamespace } from '@/domain/features/recommender-service'
import { DocumentToVectorTransformer } from './document-to-vector-transformer-service'
import { SimilarityCalculatorService } from './similarity-calculator-service'

export class RecommenderSponsorService implements RecommenderSponsorInterface {
  constructor (private readonly documentToVectorTransformer: DocumentToVectorTransformer,
    private readonly calculateSimilarity: SimilarityCalculatorService) {}

  async perform (params: RecommenderSponsorNamespace.Input): Promise<RecommenderSponsorNamespace.Output> {
    const docToVector = this.documentToVectorTransformer.perform({ processedDocument: params.trainedData.sponsors_prepared })
    const similarityCalculator = this.calculateSimilarity.perform(docToVector)

    return {
      sponsor: {
        id: params.id
      },
      similarSponsors: similarityCalculator[params.id]
    }
  }
}
