import { ProcessedSponsorDocumentData } from '../models/processed-document'

export type SponsorInfoSalic = {
  idSalic: string
  nome: string
  cgccpf: string
  total_doado: number
}

export namespace AvailableSponsorNamespace {
  export type Input = {
    preparedData: {
      sponsors_prepared: ProcessedSponsorDocumentData[]
    }
  }
  export type Output = {
    availableSponsors: SponsorInfoSalic[]
  }
}

export interface AvailableSponsorInterface {
  perform: (params: AvailableSponsorNamespace.Input) => Promise<AvailableSponsorNamespace.Output>
}
