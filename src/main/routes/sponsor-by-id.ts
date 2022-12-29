import { adaptExpressRoute } from '@/infra/http/express-router'
import { Router } from 'express'
import { makeSponsorByIdController } from '../factories/sponsor-by-id-controller'

export default (router: Router): void => {
  const sponsorByIdControllerr = makeSponsorByIdController()
  router.get('/sponsor/', adaptExpressRoute(sponsorByIdControllerr))
}
