import { Router } from 'express'
import {
  create,
  uploadImage,
  list,
  find,
  update,
  remove
} from './../controllers/products'

const router = Router()

router.post('/', uploadImage, create)

router.get('/', list)

router.get('/:id', find)

router.put('/:id', uploadImage, update)

router.delete('/:id', remove)

export default router
