import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

router.get('/', (req, res) => {
  const db = getDb()
  const drivers = db.prepare(`
    SELECT d.*, GROUP_CONCAT(dr.location_id) as route_ids
    FROM drivers d
    LEFT JOIN driver_routes dr ON d.id = dr.driver_id
    GROUP BY d.id
    ORDER BY d.id
  `).all()

  const result = drivers.map(d => ({
    ...d,
    routes: d.route_ids ? d.route_ids.split(',') : [],
    route_ids: undefined
  }))

  res.json({ success: true, drivers: result })
})

export default router
