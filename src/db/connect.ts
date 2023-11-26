import mongoose from 'mongoose'

const connectDb = async () => {
  if (process.env.MONGODB_URL === undefined) {
    throw new Error('[db] MONGODB_URL is not set')
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('[db] Sucessfully connected to MongoDB')
  } catch (error) {
    console.log('[db] There was an error trying to connect to MongoDB')
    console.error(error)
  }
}

export default connectDb
