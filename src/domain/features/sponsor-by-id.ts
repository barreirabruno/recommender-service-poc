export namespace SponsorByIdNamespace {
  export type Input = {
    id: string
  }
  export type Output = {
    idSalic: string
    nome: string
    cgccpf: string
    total_doado: number
  }
}

export interface SponsorByIdInterface {
  perform: (params: SponsorByIdNamespace.Input) => Promise<SponsorByIdNamespace.Output>
}
