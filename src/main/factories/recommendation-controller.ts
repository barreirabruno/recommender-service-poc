import { RecommenderController } from '@/application/controllers/recommender-controller'
import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { RecommenderSponsorService } from '@/data/services/recommender-service'
import { SimilarityCalculatorService } from '@/data/services/similarity-calculator-service'
import { TfidCalculatorService } from '@/infra/natural/tfidf-calculator-service'
import { VectorService } from '@/infra/vector-object/vector-service'

export const makeRecommenderController = (): RecommenderController => {
  const vectorService = new VectorService()
  const tfidfDependency = new TfidCalculatorService()
  const documentToVector = new DocumentToVectorTransformer(tfidfDependency, vectorService)
  const similarityCalculator = new SimilarityCalculatorService()
  const recommenderSponsorService = new RecommenderSponsorService(documentToVector, similarityCalculator)
  return new RecommenderController(recommenderSponsorService)
}
