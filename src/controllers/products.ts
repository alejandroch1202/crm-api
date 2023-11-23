import type { Request, Response, NextFunction } from 'express'
import { unlink } from 'fs'
import { upload } from '../config/multer'
import Product from './../models/Product'

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = new Product(req.body)
    if (req.file?.filename !== undefined) {
      product.image = req.file?.filename
    }
    await product.save()
    res.status(201).json({ ok: true, message: 'Product created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (error) => {
    if (error !== undefined && error !== null) {
      res.json({ message: error })
    }
    next()
  })
}

const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find()
    res.status(200).json({ ok: true, products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const findProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product === null) {
      return res.status(404).json({ ok: false, message: 'Product not found' })
    }
    res.status(200).json({ ok: true, product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const changes = req.body
    // If user didn't upload an image, keep the previous one
    if (req.file?.filename !== '') {
      changes.image = req.file?.filename
    } else {
      const product = await Product.findById(req.params.id)
      if (product === null) {
        return res.status(404).json({ ok: false, message: 'Product not found' })
      }
      changes.image = product.image
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      changes
    )
    if (updatedProduct === null) {
      return res.status(404).json({ ok: false, message: 'Product not found' })
    }
    res.status(200).json({ ok: true, message: 'Product updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product === null) {
      return res.status(404).json({ ok: false, message: 'Product not found' })
    }
    unlink(`uploads/${product.image}`, (error) => {
      if (error !== undefined && error !== null) {
        console.log('HERE', error)
      }
    })
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ ok: true, message: 'Product deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export {
  createProduct,
  uploadImage,
  listProducts,
  findProduct,
  updateProduct,
  removeProduct
}
