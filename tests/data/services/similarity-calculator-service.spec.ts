import { TfidCalculatorService } from '@/infra/natural/tfidf-calculator-service'
import { VectorService } from '@/infra/vector-object/vector-service'
import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { SimilarityCalculatorService } from '@/data/services/similarity-calculator-service'
import * as testData from '../../infra/_prepared_data/prepared_data_sponsor_salic.json'

export type SutTypes = {
  documentToVector: DocumentToVectorTransformer
  similarityCalculatorService: SimilarityCalculatorService
}

const makeSut = (): SutTypes => {
  const vectorService = new VectorService()
  const tfidfDependency = new TfidCalculatorService()
  const docToVector = new DocumentToVectorTransformer(tfidfDependency, vectorService)
  return {
    documentToVector: docToVector,
    similarityCalculatorService: new SimilarityCalculatorService()
  }
}

describe('SimilarityCalculatorService', () => {
  test('should calculate cosine similarity successfully', async () => {
    const { documentToVector, similarityCalculatorService } = makeSut()
    const vectors = documentToVector.perform({ processedDocument: testData.sponsors_prepared })
    const result = similarityCalculatorService.perform(vectors)
    const keys = Object.keys(result)
    keys.forEach((key: string) => {
      expect(result[key].length).toBe(5)
      result[key].map((element: any) => {
        expect(element).toHaveProperty('id')
        expect(element).toHaveProperty('score')
        return null
      })
    })
  })
})
