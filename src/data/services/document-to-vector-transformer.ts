import { DocumentToVectorTransformerInterface, DocumentToVectorTransformerNamespace } from '@/domain/features/document-to-vector'

export class DocumentToVectorTransformer implements DocumentToVectorTransformerInterface {
  perform (params: DocumentToVectorTransformerNamespace.Input): any {
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
