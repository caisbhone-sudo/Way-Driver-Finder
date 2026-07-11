import { haversineKm, findBestLocationMatch } from '@/utility/helpers'

export function useGeolocation() {
  async function reverseGeocode(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      )
      if (!res.ok) return ''
      const data = await res.json()
      return data.display_name || ''
    } catch {
      return ''
    }
  }

  function getCurrentPosition(locations) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords
          const addressText = await reverseGeocode(latitude, longitude)
          const match = findBestLocationMatch(latitude, longitude, addressText, locations)
          resolve({ match, latitude, longitude, addressText })
        },
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 }
      )
    })
  }

  return { getCurrentPosition, reverseGeocode }
}
