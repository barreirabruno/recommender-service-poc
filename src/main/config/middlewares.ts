import { Express, json } from 'express'
import cors from 'cors'
import { infoLogger } from '@/infra/logger/logger'

export const setupMiddlewares = (app: Express): void => {
  infoLogger('[Setup middlewares]')
  app.use(cors())
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
