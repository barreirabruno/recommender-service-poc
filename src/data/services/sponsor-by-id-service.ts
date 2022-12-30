import { SponsorByIdInterface, SponsorByIdNamespace } from '@/domain/features/sponsor-by-id'
import HttpClientAxios from '@/infra/http/axios-http-client'
import { infoLogger } from '@/infra/logger/logger'
import * as preparedData from '@/infra/_prepared_data/prepared_data_sponsor_salic.json'

export default class SponsorByIdService implements SponsorByIdInterface {
  constructor (
    private readonly httpClient: HttpClientAxios
  ) {}

  async perform (params: SponsorByIdNamespace.Input): Promise<SponsorByIdNamespace.Output> {
    infoLogger('[DATA][SponsorByIdService][perform]')
    const sponsorIndexInPreparedData = preparedData.sponsors_prepared.findIndex(sponsor => params.id === sponsor.id)

    if (sponsorIndexInPreparedData === -1) {
      return {
        idSalic: 'NONE_FROM_SALIC',
        nome: 'NONE_FROM_SALIC',
        cgccpf: 'NONE_FROM_SALIC',
        total_doado: 0
      }
    }

    const httpResponseSalic = await this.httpClient.request({
      url: `http://api.salic.cultura.gov.br/v1/incentivadores/${params.id}?format=json`,
      method: 'get'
    })

    const sponsorIdFormatted = httpResponseSalic.body._links !== undefined ? httpResponseSalic.body._links.self.split('http://api.salic.cultura.gov.br/v1/incentivadores/').pop() : 'NONE_FROM_SALIC'

    return {
      idSalic: sponsorIdFormatted ?? 'NONE_FROM_SALIC',
      nome: httpResponseSalic.body.nome ?? 'NONE_FROM_SALIC',
      cgccpf: httpResponseSalic.body.cgccpf ?? 'NONE_FROM_SALIC',
      total_doado: httpResponseSalic.body.total_doado ?? 0
    }
  }
}
