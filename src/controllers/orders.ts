import type { Request, Response, NextFunction } from 'express'
import Order from './../models/Order'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).json({ ok: true, message: 'Order created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const listOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find()
      .populate('client')
      .populate({ path: 'products.product', model: 'Products' })
    res.status(200).json({ ok: true, orders })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const findOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client')
      .populate({ path: 'products.product', model: 'Products' })
    if (order === null) {
      return res.status(404).json({ ok: false, message: 'Order not found' })
    }
    res.status(200).json({ ok: true, order })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body)
    if (order === null) {
      return res.status(404).json({ ok: false, message: 'Order not found' })
    }
    res.status(200).json({ ok: true, message: 'Order updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const removeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (order === null) {
      return res.status(404).json({ ok: false, message: 'Order not found' })
    }
    res.status(200).json({ ok: true, message: 'Order deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export { createOrder, listOrders, findOrder, updateOrder, removeOrder }
