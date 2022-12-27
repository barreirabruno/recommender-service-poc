import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'
import { TfidCalculatorService } from '@/infra/natural/tfidf-calculator-service'
import { VectorService } from '@/infra/vector-object/vector-service'

const makeSut = (): any => {
  const vectorService = new VectorService()
  const tfidfDependency = new TfidCalculatorService()
  return {
    documentToVectorTransformerService: new DocumentToVectorTransformer(tfidfDependency, vectorService)
  }
}

describe('DocumentToVectorTransformer', () => {
  test('should transform documents in vectors', () => {
    const { documentToVectorTransformerService } = makeSut()
    const result = documentToVectorTransformerService.perform({ processedDocument: [{ id: 'any_sponsor_id', content: 'any_sponsor_content' }] })
    expect(result.length).toBe(1)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('vector')
  })
})
