import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connect from './db/connect'
import router from './routes'

const PORT = process.env.PORT ?? 4000
const app = express()

connect()
app.use(express.json())
app.use(cors())
router(app)

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`)
})
