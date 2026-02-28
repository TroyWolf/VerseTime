import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
import rateLimit from 'express-rate-limit'
import routes from './routes.js'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webDist = join(__dirname, '../../web/dist')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = express()

app.set('trust proxy', 1)

const server = http.createServer({}, app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors())

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
})
app.use(limiter)

app.use(logger('dev'))

routes(app)

app.use(express.static(webDist))
app.get('*splat', (_req, res) => {
  res.sendFile(join(webDist, 'index.html'))
})

// Error handler
app.use((err: Error & { status?: number }, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.log('In route default error handler', JSON.stringify(err, null, 2))
  console.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  )
  res.status(err.status || 500)
  res.json({ error: err || 'Something went wrong' })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
