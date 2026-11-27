import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { authRouter } from './routes/auth.js'
import { contentRouter } from './routes/content.js'
import { enquiryRouter } from './routes/enquiries.js'
import { adminRouter } from './routes/admin.js'
import { errorHandler, notFound } from './middleware/errors.js'

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(s => s.trim())

app.use(helmet())
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
  return callback(new Error('Origin is not allowed by CORS'))
} }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Home Hancer API' }))
app.use('/api/auth', authRouter)
app.use('/api/content', contentRouter)
app.use('/api/enquiries', enquiryRouter)
app.use('/api/admin', adminRouter)
app.use(notFound)
app.use(errorHandler)

if (!process.env.MONGODB_URI) {
  console.error('Missing MONGODB_URI. Copy server/.env.example to server/.env and configure Atlas.')
  process.exit(1)
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Home Hancer API running on http://localhost:${PORT}`))
  })
  .catch(error => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
