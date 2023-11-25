import type { Request } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface User {
  id: string
  name: string
  email: string
}

const generateJwt = ({ id, name, email }: User) => {
  const secret = process.env.JWT_SECRET as string
  return jwt.sign(
    {
      sub: id,
      email,
      name
    },
    secret,
    {
      expiresIn: '1h'
    }
  )
}

const generateId = () => {
  return Math.random().toString(32).substring(2) + Date.now().toString(32)
}

const extractCredentials = (headers: Request['headers']) => {
  const credentials = headers.authorization?.split(' ')[1]

  const decode = Buffer.from(credentials as string, 'base64').toString()

  return decode.split(':')
}

const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export { generateJwt, generateId, extractCredentials, comparePassword }
