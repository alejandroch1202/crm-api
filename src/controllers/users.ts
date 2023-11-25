import type { Request, Response, NextFunction } from 'express'
import User from './../models/User'
import bcrypt from 'bcryptjs'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User(req.body)
    user.password = bcrypt.hashSync(user.password, 10)
    await user.save()
    res.status(201).json({ ok: true, message: 'User created' })
  } catch (error) {
    if ((error as any).code === 11000) {
      return res.status(400).json({ ok: false, message: 'Email already used' })
    } else {
      console.log(error)
      res.status(500).json({ ok: false, message: 'Server error' })
    }
    next()
  }
}

export { create }
