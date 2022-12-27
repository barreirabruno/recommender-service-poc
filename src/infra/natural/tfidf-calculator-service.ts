import { TfIdf } from 'natural'
import { TfidCalculatorInterface, TfIdfTerm } from '@/data/contracts/tfidf-calculator-service'

export class TfidCalculatorService implements TfidCalculatorInterface {
  tfIdf: TfIdf

  constructor () {
    this.tfIdf = new TfIdf()
  }

  addDocument (document: string, key?: string | undefined, restoreCache?: boolean | undefined): void {
    this.tfIdf.addDocument(document)
  }

  listTerms (d: number): TfIdfTerm[] {
    return this.tfIdf.listTerms(d)
  }
}
