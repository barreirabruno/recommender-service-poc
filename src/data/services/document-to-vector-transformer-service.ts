import { DocumentToVectorTransformerInterface, DocumentToVectorTransformerNamespace } from '@/domain/features/document-to-vector'
import { ProcessedSponsorDocument } from '@/domain/models/processed-document'

interface TfIdfTerm {
  term: string
  tfidf: number
}

interface TfidCalculatorInterface {
  addDocument: (document: string, key?: string, restoreCache?: boolean) => void
  listTerms: (d: number) => TfIdfTerm[]
}

interface VectorServiceInterface {
  create: (object: object) => any
}

export class DocumentToVectorTransformer implements DocumentToVectorTransformerInterface {
  constructor (
    private readonly tfidf: TfidCalculatorInterface,
    private readonly vector: VectorServiceInterface
  ) {}

  perform (params: DocumentToVectorTransformerNamespace.Input): any {
    params.processedDocument.forEach((pd: ProcessedSponsorDocument) => {
      this.tfidf.addDocument(pd.content)
    })

    const documentVectors = []

    for (let i = 0; i < params.processedDocument.length; i++) {
      const processedDocument = params.processedDocument[i]
      const obj: any = {}

      const items = this.tfidf.listTerms(i)

      for (let j = 0; j < items.length; j += 1) {
        const item = items[i]
        obj[item.term] = item.tfidf
      }

      const documentVector = {
        id: processedDocument.id,
        vector: this.vector.create(obj)
      }

      documentVectors.push(documentVector)
    }

    return documentVectors
  }
}
