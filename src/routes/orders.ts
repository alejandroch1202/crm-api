import { Router } from 'express'
import {
  createOrder,
  listOrders,
  findOrder,
  updateOrder,
  removeOrder
} from './../controllers/orders'

const router = Router()

router.post('/', createOrder)

router.get('/', listOrders)

router.get('/:id', findOrder)

router.put('/:id', updateOrder)

router.delete('/:id', removeOrder)

export default router
