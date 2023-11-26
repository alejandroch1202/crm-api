import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connect from './db/connect'
import router from './routes'

const whitelist = [process.env.FRONTEND_URL]
const PORT = process.env.PORT ?? 4000
const app = express()

connect()
app.use(express.json())

app.use(express.static('uploads'))

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = whitelist.some((domain) => domain === origin)
      if (allowed) {
        callback(null, true)
      } else {
        callback(new Error('Blocked by CORS'), false)
      }
    }
  })
)
router(app)

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`)
})
