import { Express, Router } from 'express'
import bibleRoutes from './bible/routes.js'

export default (app: Express) => {
  const router = Router()
  bibleRoutes(router)
  app.use('/api', router)
}
