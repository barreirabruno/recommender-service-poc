export type SponsorInfoSalic = {
  nome: string
  cgccpf: string
  total_doado: number
}

export namespace AvailableSponsorNamespace {
  export type Input = {
    id: string
  }
  export type Output = {
    availableSponsors: SponsorInfoSalic[]
  }
}

export interface AvailableSponsorInterface {
  perform: (params: AvailableSponsorNamespace.Input) => Promise<AvailableSponsorNamespace.Output>
}
