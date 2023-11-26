import type { Request, Response, NextFunction } from 'express'
import { verifyJwt } from './../utils/token'

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.get('Authorization')

  if (authHeaders === undefined) {
    return res.status(401).json({ ok: false, message: 'Unauthenticated' })
  }

  try {
    const token = authHeaders.split(' ')[1]
    verifyJwt(token)
    next()
  } catch (error) {
    return res.status(401).json({ ok: false, message: 'Invalid token' })
  }
}
