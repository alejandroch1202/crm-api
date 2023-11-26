import { Router } from 'express'
import type { Express } from 'express'
import auth from './auth'
import users from './users'
import clients from './clients'
import products from './products'
import orders from './orders'
import authorization from './../middlewares/auth'

const router = (app: Express): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', auth)

  router.use('/users', authorization, users)

  router.use('/clients', authorization, clients)

  router.use('/products', authorization, products)

  router.use('/orders', authorization, orders)
}

export default router
