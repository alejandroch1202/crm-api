import express from 'express'
import 'dotenv/config'
import connect from './db/connect'
import router from './routes'

const PORT = process.env.PORT ?? 4000
const app = express()

connect()

app.use(express.json())
router(app)

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`)
})
