import { AvailableSponsorInterface, AvailableSponsorNamespace, SponsorInfoSalic } from '@/domain/features/available-sponsor-service'
import HttpClientAxios from '@/infra/http/axios-http-client'

export default class AvailableSponsorService implements AvailableSponsorInterface {
  constructor (
    private readonly httpClient: HttpClientAxios
  ) {}

  async perform (params: AvailableSponsorNamespace.Input): Promise<AvailableSponsorNamespace.Output> {
    const salicRequests = params.preparedData.sponsors_prepared.map(sponsor => {
      return `http://api.salic.cultura.gov.br/v1/incentivadores/${sponsor.id}?format=json`
    }).map(async salicurl => {
      return await this.httpClient.request({
        url: salicurl,
        method: 'get'
      })
    })

    const sponsorInfosArray: SponsorInfoSalic[] = []

    await Promise.all(salicRequests).then(function (values) {
      values.map((sponsor, index) => {
        if (sponsor.statusCode !== 200) {
          return {
            nome: 'NONE_FROM_SALIC',
            cgccpf: 'NONE_FROM_SALIC',
            total_doado: 'NONE_FROM_SALIC'
          }
        }

        const sponsorIdFormatted = sponsor.body._links !== undefined ? sponsor.body._links.self.split('http://api.salic.cultura.gov.br/v1/incentivadores/').pop() : 'NONE_FROM_SALIC'

        return sponsorInfosArray.push({
          idSalic: sponsorIdFormatted,
          nome: sponsor.body.nome ?? 'NONE_FROM_SALIC',
          cgccpf: sponsor.body.cgccpf ?? 'NONE_FROM_SALIC',
          total_doado: sponsor.body.total_doado ?? 'NONE_FROM_SALIC'
        })
      })
    })

    return {
      availableSponsors: sponsorInfosArray
    }
  }
}
