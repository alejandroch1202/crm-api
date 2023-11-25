import type { Request, Response, NextFunction } from 'express'
import Client from './../models/Client'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = new Client(req.body)
    await client.save()
    res.status(201).json({ ok: true, message: 'Client created' })
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

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await Client.find()
    res.status(200).json({ ok: true, clients })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await Client.findById(req.params.id)
    if (client === null) {
      return res.status(404).json({ ok: false, message: 'Client not found' })
    }
    res.status(200).json({ ok: true, client })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body)
    if (client === null) {
      return res.status(404).json({ ok: false, message: 'Client not found' })
    }
    res.status(200).json({ ok: true, message: 'Client updated' })
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

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (client === null) {
      return res.status(404).json({ ok: false, message: 'Client not found' })
    }
    res.status(200).json({ ok: true, message: 'Client deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export { create, list, find, update, remove }
