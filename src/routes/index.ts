import { Router } from 'express'
import type { Express } from 'express'
import clients from './clients'

const router = (app: Express): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/clients', clients)
}

export default router
