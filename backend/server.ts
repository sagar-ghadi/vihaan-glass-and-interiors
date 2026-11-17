import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { connectToDatabase } from './config/db.js'
import formRoutes from './routes/formRoutes.js'

const app = express()
const port = Number(process.env.PORT ?? 5000)
const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '10kb' }))
app.get('/', (_req, res) => res.json({
  name: 'Vihaan Glass & Interiors API',
  status: 'ok',
  endpoints: { health: '/api/health', contactForm: '/api/forms' },
}))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/forms', formRoutes)
app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }))

const databaseUri = process.env.MONGODB_URI
if (!databaseUri) {
  console.error('MONGODB_URI is required. Add it to backend/.env.')
  process.exit(1)
}

try {
  await connectToDatabase(databaseUri)
  app.listen(port, () => console.info(`API listening on http://localhost:${port}`))
} catch (error) {
  console.error('Could not connect to MongoDB:', error)
  process.exit(1)
}