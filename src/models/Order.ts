import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  client: {
    type: Schema.ObjectId,
    ref: 'Clients',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.ObjectId,
        ref: 'Products'
      },
      quantity: { type: Number }
    }
  ],
  total: { type: Number }
})

export default model('Orders', orderSchema)
