import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

router.get('/', (req, res) => {
  const db = getDb()
  const locations = db.prepare("SELECT * FROM locations ORDER BY base DESC, name ASC").all()

  const result = locations.map(loc => ({
    ...loc,
    base: Boolean(loc.base)
  }))

  res.json({ success: true, locations: result })
})

export default router
