import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' })
  }

  const db = getDb()
  const stmt = db.prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)")
  stmt.run(name, email, subject, message)

  res.json({ success: true, message: 'Message sent successfully' })
})

export default router
