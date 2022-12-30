import { adaptExpressRoute } from '@/infra/http/express-router'
import { Router } from 'express'
import { makeAvailableSponsorsController } from '../factories/available-sponsors-controller'

export default (router: Router): void => {
  const availableSponsors = makeAvailableSponsorsController()
  router.get('/sponsor/', adaptExpressRoute(availableSponsors))
}
