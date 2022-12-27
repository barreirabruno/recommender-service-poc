type ProcessedSponsorDocumentData = {
  id: string
  content: string
}

export class ProcessedSponsorDocument {
  id: string
  content: string

  constructor (processedDocumentData: ProcessedSponsorDocumentData) {
    this.id = processedDocumentData.id
    this.content = processedDocumentData.content
  }
}
