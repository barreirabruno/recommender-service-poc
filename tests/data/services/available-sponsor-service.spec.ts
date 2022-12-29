import { AvailableSponsorInterface, AvailableSponsorNamespace } from '@/domain/features/available-sponsor-service'

class AvailableSponsorService implements AvailableSponsorInterface {
  async perform (params: AvailableSponsorNamespace.Input): Promise<AvailableSponsorNamespace.Output> {
    return {
      availableSponsors: [
        {
          nome: 'any_sponsor_name_salic',
          cgccpf: 'any_sponsor_cgccpf',
          total_doado: 0
        }
      ]
    }
  }
}

type SutTypes = {
  availableSponsor: AvailableSponsorService
}

const makeSut = (): SutTypes => {
  return {
    availableSponsor: new AvailableSponsorService()
  }
}

describe('available-sponsor-service', () => {
  it('should return all available sponsors id in prepared-data', async () => {
    const { availableSponsor } = makeSut()
    const response = await availableSponsor.perform({ id: 'any_id' })
    // console.log('[UNIT TEST]: ', response)
    expect(response).toHaveProperty('availableSponsors')
    response.availableSponsors.map((sponsor) => {
      expect(sponsor).toHaveProperty('nome')
      expect(sponsor).toHaveProperty('cgccpf')
      expect(sponsor).toHaveProperty('total_doado')
      return null
    })
  })
})
