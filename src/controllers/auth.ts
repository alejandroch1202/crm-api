import type { Request, Response, NextFunction } from 'express'
import User from './../models/User'
import {
  generateJwt,
  extractCredentials,
  comparePassword
} from '../utils/token'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if exists authorization header
    if (req.headers.authorization === undefined) {
      return res.status(400).json({ ok: false, message: 'Invalid credentials' })
    }

    // Extract credentials from headers
    const [email, password] = extractCredentials(req.headers)

    // Check if the user exists
    const user = await User.findOne({ email })
    if (user === null) {
      return res.status(401).json({ ok: false, message: 'User not found' })
    }

    // Check if the password is correct
    const auth = comparePassword(password, user.password)
    if (!auth) {
      return res.status(401).json({ ok: false, message: 'Invalid credentials' })
    }

    // Generate JWT
    const token = generateJwt({
      id: user.id,
      name: user.name,
      email: user.email
    })

    res.status(200).json({ ok: true, token })
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

export { login }
