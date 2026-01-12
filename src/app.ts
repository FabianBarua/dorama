import express, { Application } from 'express'
import helloWorldRoutes from './routes/helloWorld.routes'
import dramaboxRoutes from './routes/dramabox.routes'

const app: Application = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

// Routes
app.use('/api', helloWorldRoutes)
app.use('/api/dramabox', dramaboxRoutes)

export default app
