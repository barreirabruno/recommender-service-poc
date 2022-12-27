import { Controller } from '@/application/controllers/controller'
import { ServerError } from '@/domain/models/errors/server-error'
import { HttpResponse } from '../helpers/http'

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<any> {
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

  it('should return 500 if perforrm method fail for any reason', async () => {
    const error = new ServerError(new Error('ANY_ERROR'))
    jest.spyOn(sut, 'perform').mockResolvedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({
      sponsor_id: 'any_sponsor_id'
    })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: error
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle({
      sponsor_id: 'any_sponsor_id'
    })

    expect(httpResponse).toEqual(sut.result)
  })
})
