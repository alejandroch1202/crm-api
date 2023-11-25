import { Router } from 'express'
import type { Express } from 'express'
import auth from './auth'
import users from './users'
import clients from './clients'
import products from './products'
import orders from './orders'

const router = (app: Express): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', auth)

  router.use('/users', users)

  router.use('/clients', clients)

  router.use('/products', products)

  router.use('/orders', orders)
}

export default router
