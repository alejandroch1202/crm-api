import { Router } from 'express'
import {
  createProduct,
  uploadImage,
  listProducts,
  findProduct,
  updateProduct,
  removeProduct
} from '../controllers/products'

const router = Router()

router.post('/', uploadImage, createProduct)

router.get('/', listProducts)

router.get('/:id', findProduct)

router.put('/:id', uploadImage, updateProduct)

router.delete('/:id', removeProduct)

export default router
