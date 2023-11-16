import express from 'express'
import 'dotenv/config'
import router from './routes'

const app = express()
const PORT = process.env.PORT ?? 4000

router(app)

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`)
})
