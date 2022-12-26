import { Sponsor } from '../../../src/domain/models/sponsor'

type SutTypes = {
  sponsor: Sponsor
}

const makeSut = (): SutTypes => {
  return {
    sponsor: new Sponsor({ id: 'any_id', content: 'any_content' })
  }
}

describe('domain', () => {
  describe('models', () => {
    test('should instanciate a Sponsor correctly', () => {
      const { sponsor } = makeSut()
      expect(sponsor).toEqual({
        id: 'any_id',
        content: 'any_content'
      })
    })
  })
})
