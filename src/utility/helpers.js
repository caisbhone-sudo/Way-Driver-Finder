export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function nearestBaseHub(loc, locations) {
  let best = null
  let bestDist = Infinity
  const baseLocations = locations.filter(l => l.base)
  baseLocations.forEach(l => {
    const dist = l.id === loc.id ? 0 : haversineKm(loc.lat, loc.lng, l.lat, l.lng)
    if (dist < bestDist) { bestDist = dist; best = l }
  })
  return best
}

export function normalizeAddressText(value = '') {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function findBestLocationMatch(latitude, longitude, addressText, locations) {
  const normalizedAddress = normalizeAddressText(addressText)
  let best = null
  let bestScore = -Infinity
  let bestDistance = Infinity

  locations.forEach(loc => {
    const dist = haversineKm(latitude, longitude, loc.lat, loc.lng)
    const normalizedName = normalizeAddressText(loc.name)
    let score = 0

    if (normalizedAddress && normalizedName) {
      if (normalizedAddress.includes(normalizedName) || normalizedName.includes(normalizedAddress)) {
        score += 20
      }
      const addressTokens = normalizedAddress.split(/\s+/)
      const nameTokens = normalizedName.split(/\s+/)
      const overlap = addressTokens.filter(token => nameTokens.includes(token)).length
      score += overlap * 3
    }

    const distanceBoost = Math.max(0, 8 - Math.round(dist))
    const totalScore = score + distanceBoost

    if (totalScore > bestScore || (totalScore === bestScore && dist < bestDistance)) {
      best = loc
      bestScore = totalScore
      bestDistance = dist
    }
  })

  return best
}
