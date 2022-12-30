import { adaptExpressRoute } from '@/infra/http/express-router'
import { Router } from 'express'
import { makeRecommenderController } from '../factories/recommendation-controller'

export default (router: Router): void => {
  const recommendationController = makeRecommenderController()
  router.get('/sponsor/recommender', adaptExpressRoute(recommendationController))
}
