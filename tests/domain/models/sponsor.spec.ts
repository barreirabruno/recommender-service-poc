import { ProcessedSponsorDocument } from '../../../src/domain/models/processed-document'

type SutTypes = {
  sponsor: ProcessedSponsorDocument
}

const makeSut = (): SutTypes => {
  return {
    sponsor: new ProcessedSponsorDocument({ id: 'any_id', content: 'any_content' })
  }
}

describe('models', () => {
  test('should instanciate a Sponsor correctly', () => {
    const { sponsor } = makeSut()
    expect(sponsor).toEqual({
      id: 'any_id',
      content: 'any_content'
    })
  })
})
