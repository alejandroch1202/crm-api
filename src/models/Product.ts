import { Schema, model } from 'mongoose'

const produtcSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  }
})

export default model('Product', produtcSchema)
