import { ProcessedSponsorDocument } from '../models/processed-document'

export namespace DocumentToVectorTransformerNamespace {
  export type Input = {
    processedDocument: ProcessedSponsorDocument[]
  }
}

export interface DocumentToVectorTransformerInterface {
  perform: (params: DocumentToVectorTransformerNamespace.Input) => any
}
