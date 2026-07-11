import api from './index'
import { DRIVERS, DRIVER_ROUTES } from '@/utility/data'

let useApi = true

export async function fetchDrivers() {
  try {
    const { data } = await api.get('/get_drivers.php')
    if (data.success) return data.drivers
    throw new Error('API failed')
  } catch {
    useApi = false
    return DRIVERS.map(d => ({
      ...d,
      routes: DRIVER_ROUTES[d.id] || []
    }))
  }
}

export async function fetchLocations() {
  try {
    const { data } = await api.get('/get_locations.php')
    if (data.success) return data.locations
    throw new Error('API failed')
  } catch {
    useApi = false
    return []
  }
}

export async function submitContact(formData) {
  try {
    const { data } = await api.post('/submit_contact.php', formData)
    return data
  } catch {
    return { success: false, error: 'Network error' }
  }
}
