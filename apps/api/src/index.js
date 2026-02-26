import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
// import rateLimit from 'express-rate-limit'
import routes from './routes.js'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = express()

/**
 * I don't really know what this is, but it supposedly addresses this error:
 *   ValidationError: The 'X-Forwarded-For' header is set but the Express 'trust proxy' setting is false
 */
app.enable('trust proxy')

const server = http.createServer({}, app)

app.use(bodyParser.json())
app.use(cookieParser())

/*
const corsWhitelist = [
  '*',
  'https://versetime.net',
  'https://www.versetime.net',
  'http://versetime.local',
  'https://versetime.local',
  'http://localhost:5173/',
  'https://localhost:5173/'
]
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
)
*/

app.use(cors())

/* Need to figure how to use this behind proxy
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

//  apply to all requests
app.use(limiter)
*/

app.use(logger('dev'));

routes(app)

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  //res.locals.message = err.message
  //res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log('In route default error handler', JSON.stringify(err, null, 2))
  console.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )

  res.status(err.status || 500)
  res.json({ error: err || 'Something went wrong' })
  //res.json()
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
