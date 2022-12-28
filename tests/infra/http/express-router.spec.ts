import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from '@/application/controllers/controller'
import { adaptExpressRoute } from '@/infra/http/express-router'

const mockDataResponse = {
  sponsor: {
    id: '1b4799bfab614f027f9682b50f1783c64d57f32ef15ccc4909fbd570da9a'
  },
  similarSponsors: [
    {
      id: '5afec5523308eb0d860f5f568c31bedd7268cb38ea27d861b6327cbdd8ef',
      content: 'Humanidades Humanidades Musica Artes Cenicas Humanidades Humanidades Humanidades Humanidades Humanidades Humanidades Artes Cenicas Artes Cenicas Humanidades Artes Cenicas Artes Integradas Artes Integradas Artes Integradas Artes Cenicas'
    }
  ]
}

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: mockDataResponse
    })
    sut = adaptExpressRoute(controller)
  })

  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
