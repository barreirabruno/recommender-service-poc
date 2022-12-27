import { ProcessedSponsorDocument } from '../models/processed-document'

export namespace RecommenderSponsorNamespace {
  export type Input = {
    id: string
    trainedData: any
  }
  export type Output = {
    sponsor: {
      id: string
    }
    similarSponsors: ProcessedSponsorDocument[]
  }
}

export interface RecommenderSponsorInterface {
  perform: (params: RecommenderSponsorNamespace.Input) => Promise<RecommenderSponsorNamespace.Output>
}
