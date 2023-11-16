import { Router } from 'express'
import type { Express } from 'express'

const router = (app: Express): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.get('/users', (req, res) => {
    res.json({ ok: true, message: 'users' })
  })

  router.get('/categories', (req, res) => {
    res.json({ ok: true, message: 'categories' })
  })
}

export default router
