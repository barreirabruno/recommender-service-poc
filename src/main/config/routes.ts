import { infoLogger } from '@/infra/logger/logger'
import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
  infoLogger('[Setup routes]')
  const router = Router()
  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => {
      (await import(`../routes/${file}`)).default(router)
    })
  app.use('/', router)
}
