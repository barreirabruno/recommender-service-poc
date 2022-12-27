export interface TfIdfTerm {
  term: string
  tfidf: number
}

export interface TfidCalculatorInterface {
  addDocument: (document: string, key?: string, restoreCache?: boolean) => void
  listTerms: (d: number) => TfIdfTerm[]
}
