export namespace AvailableSponsorNamespace {
  export type Input = {
    id: string
  }
  export type Output = {
    nome: string
    cgccpf: string
    total_doado: number
  }
}

export interface AvailableSponsorInterface {
  perform: (params: AvailableSponsorNamespace.Input) => Promise<AvailableSponsorNamespace.Output>
}
