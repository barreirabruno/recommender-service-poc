import { Controller } from '@/application/controllers/controller'

class ControllerStub extends Controller {
  result = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (): Promise<any> {
    return this.result
  }
}

describe('controllerr', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle({
      sponsor_id: 'any_sponsor_id'
    })

    expect(httpResponse).toEqual(sut.result)
  })
})
