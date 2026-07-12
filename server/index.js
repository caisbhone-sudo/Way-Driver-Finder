import express from 'express'
import cors from 'cors'
import { initDb } from './db.js'
import driversRouter from './routes/drivers.js'
import locationsRouter from './routes/locations.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

// Auto-init database on first request
app.use((req, res, next) => {
  initDb()
  next()
})

app.use('/get_drivers.php', driversRouter)
app.use('/get_locations.php', locationsRouter)
app.use('/submit_contact.php', contactRouter)

app.get('/ping', (req, res) => {
  res.json({ success: true, message: 'API server running' })
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
