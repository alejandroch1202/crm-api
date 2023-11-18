import { Schema, model } from 'mongoose'

const clientSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
})

export default model('Client', clientSchema)
