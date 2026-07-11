import L from 'leaflet'

export function createSvgIcon(label, color, background, accent = '#fff') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect x="8" y="8" width="48" height="48" rx="16" fill="${background}" />
    <path d="M32 10c-8 0-14 6-14 14 0 9 10 20 13 23a1 1 0 0 0 1.5 0c3-3 13-14 13-23 0-8-6-14-14-14z" fill="${color}" />
    <circle cx="32" cy="24" r="7" fill="${accent}" />
    <text x="32" y="54" text-anchor="middle" font-size="14" font-family="Arial, sans-serif" font-weight="700" fill="${accent}">${label}</text>
  </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function getLocationIcon(loc, kind = 'location') {
  const id = (loc && loc.id) || ''
  const iconMap = {
    hospital: createSvgIcon('🏥', '#d94b4b', '#ffe4e4'),
    shop: createSvgIcon('🛍', '#1c7d68', '#e7f6f2'),
    park: createSvgIcon('🌳', '#2f9c6b', '#edf9f1'),
    landmark: createSvgIcon('🗺', '#a97b23', '#fdf6e5'),
    station: createSvgIcon('🚉', '#0b332c', '#f3f2e8'),
    museum: createSvgIcon('🏛', '#6c4f9d', '#f2eaff'),
    pickup: createSvgIcon('📍', '#2f6bff', '#eaf1ff'),
    dest: createSvgIcon('🎯', '#c1483a', '#ffecec')
  }

  if (kind === 'pickup') return iconMap.pickup
  if (kind === 'dest') return iconMap.dest
  if (/hospital|clinic/.test(id)) return iconMap.hospital
  if (/shop|market|super|junction|hypermarket/.test(id)) return iconMap.shop
  if (/park|zoo|garden|safari/.test(id)) return iconMap.park
  if (/museum|gems/.test(id)) return iconMap.museum
  if (/station|airport|train/.test(id)) return iconMap.station
  if (/pagoda|viewpoint|landmark|parliament/.test(id)) return iconMap.landmark
  return iconMap.landmark
}

export function createCircleMarker(latlng, kind, options = {}) {
  const loc = options.location || null
  const icon = L.icon({
    iconUrl: getLocationIcon(loc, kind),
    iconRetinaUrl: getLocationIcon(loc, kind),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    tooltipAnchor: [0, -36]
  })

  return L.marker(latlng, {
    icon,
    interactive: true,
    bubblingMouseEvents: false,
    ...options
  })
}

export function createManualMarkerIcon(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
    <path d="M22 2c-8.3 0-15 6.7-15 15 0 10.2 11.5 20.6 14.4 23.2a1.1 1.1 0 0 0 1.6 0C25.5 37.6 37 27.2 37 17c0-8.3-6.7-15-15-15z" fill="${color}" stroke="#fff" stroke-width="2"/>
    <circle cx="22" cy="17" r="6" fill="#fff"/>
  </svg>`
  return L.divIcon({
    html: `<div style="background:transparent; width:44px; height:44px;">${svg}</div>`,
    className: '',
    iconSize: [44, 44],
    iconAnchor: [22, 44]
  })
}

export function getLandmarkDetail(loc) {
  const id = (loc && loc.id) || ''
  const detailMap = {
    pagoda: {
      title: 'Uppatasanti Pagoda',
      description: 'A striking white pagoda and one of Naypyidaw most recognizable landmarks, known for its peaceful hilltop setting and ceremonial importance.',
      image: createSvgIcon('⛩', '#a97b23', '#fdf6e5')
    },
    'zoological-gardens': {
      title: 'Naypyidaw Zoological Gardens',
      description: 'A family-friendly attraction where visitors can explore native and exotic animal habitats in a spacious park setting.',
      image: createSvgIcon('🦁', '#2f9c6b', '#edf9f1')
    },
    'safari-park': {
      title: 'Naypyidaw Safari Park',
      description: 'A large wildlife attraction designed for scenic drives, animal encounters, and relaxed outdoor exploration.',
      image: createSvgIcon('🦒', '#2f9c6b', '#edf9f1')
    },
    'gems-museum': {
      title: 'Myanmar Gems Museum',
      description: 'A cultural and commercial destination highlighting Myanmar gemstone heritage, craftsmanship, and trade history.',
      image: createSvgIcon('💎', '#6c4f9d', '#f2eaff')
    },
    'landmark-garden': {
      title: 'National Landmark Garden',
      description: 'A landscaped civic garden featuring statues, formal pathways, and a sense of national symbolism.',
      image: createSvgIcon('🌿', '#1c7d68', '#e7f6f2')
    },
    'water-fountain-garden': {
      title: 'Water Fountain Garden',
      description: 'A scenic urban garden known for its decorative fountains, walking paths, and evening atmosphere.',
      image: createSvgIcon('💧', '#1c7d68', '#e7f6f2')
    },
    'parliament-viewpoint': {
      title: 'Parliament Building (Viewpoint)',
      description: 'An important civic landmark that offers a compelling view of the government district and the city planned layout.',
      image: createSvgIcon('🏛', '#0b332c', '#f3f2e8')
    },
    'yan-aung-myin-pagoda': {
      title: 'Yan Aung Myin Pagoda',
      description: 'A spiritual sanctuary with a calm atmosphere and striking architectural details.',
      image: createSvgIcon('⛪', '#a97b23', '#fdf6e5')
    }
  }

  return detailMap[id] || {
    title: loc && loc.name ? loc.name : 'Destination',
    description: 'A notable Naypyidaw location that can be explored as part of a guided city tour.',
    image: createSvgIcon('📍', '#1c7d68', '#e7f6f2')
  }
}
