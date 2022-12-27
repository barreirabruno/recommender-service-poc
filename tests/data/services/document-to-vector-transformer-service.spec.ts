import { TfIdf } from 'natural'
import Vector from 'vector-object'

import { DocumentToVectorTransformer } from '@/data/services/document-to-vector-transformer-service'

interface VectorServiceInterface {
  create: (object: object) => any
}

class VectorService implements VectorServiceInterface {
  create (object: object): any {
    return new Vector(object)
  }
}

const makeSut = (): any => {
  const vectorService = new VectorService()
  const tfidfDependency = new TfIdf()
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
