<template>
  <div class="map-wrap">
    <div id="map"></div>
    <LocationDetail :detail="selectedDetail" />
    <div class="map-loading" v-if="loading" id="mapLoading">
      <div class="spinner"></div>
      <div>{{ $t('mapLoadingLbl') }}</div>
    </div>
    <div class="map-legend">
      <span><i class="dot-hub"></i> {{ $t('legendHub') }}</span>
      <span><i class="dot-spot"></i> {{ $t('legendSpot') }}</span>
      <span><i class="dot-pick"></i> {{ $t('legendPickup') }}</span>
      <span><i class="dot-dest"></i> {{ $t('legendDest') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import { useDriverStore } from '@/stores/driverStore'
import { useToast } from '@/composables/useToast'
import { haversineKm } from '@/utility/helpers'
import { createCircleMarker, createManualMarkerIcon, getLandmarkDetail } from '@/utility/mapIcons'
import LocationDetail from '@/components/LocationDetail.vue'

const props = defineProps({
  manualMode: { type: String, default: null },
  routeDistance: { type: String, default: '--' },
  routeDuration: { type: String, default: '--' }
})

const emit = defineEmits(['update:routeDistance', 'update:routeDuration', 'mapClick'])

const driverStore = useDriverStore()
const { showToast } = useToast()

let map = null
let routeLayer = null
let landmarkLayer = null
let routeLine = null
let manualPickupMarker = null
let manualDestMarker = null
let manualPickupLatLng = null
let manualDestLatLng = null

const loading = ref(true)
const selectedDetail = ref(null)

function initMap() {
  const mapEl = document.getElementById('map')
  if (!mapEl || typeof L === 'undefined') return

  map = L.map('map', { zoomControl: false }).setView([19.7450, 96.1600], 11)
  L.control.zoom({ position: 'bottomright' }).addTo(map)

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  tiles.once('load', () => { loading.value = false })
  setTimeout(() => { loading.value = false }, 2500)

  map.on('click', (e) => {
    emit('mapClick', e.latlng)
  })

  routeLayer = L.layerGroup().addTo(map)
  landmarkLayer = L.layerGroup().addTo(map)
  plotLocations()
}

function plotLocations() {
  if (!map || !landmarkLayer) return
  landmarkLayer.clearLayers()

  const bounds = []
  driverStore.locations.forEach(loc => {
    const marker = createCircleMarker([loc.lat, loc.lng], 'spot', { location: loc, zIndexOffset: 500 })
      .bindTooltip(loc.name, { direction: 'top', offset: [0, -10], className: 'wayz-tooltip' })

    marker.on('click', () => {
      selectedDetail.value = getLandmarkDetail(loc)
      map.panTo([loc.lat, loc.lng])
    })

    marker.addTo(landmarkLayer)
    bounds.push([loc.lat, loc.lng])
  })

  if (bounds.length) {
    map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] })
  }
}

function updateRouteMarkers(pickup, dest, geometry = null) {
  if (!map || !routeLayer) return
  routeLayer.clearLayers()

  const startLatLng = geometry ? [geometry[0][0], geometry[0][1]] : [pickup.lat, pickup.lng]
  const endLatLng = geometry ? [geometry[geometry.length - 1][0], geometry[geometry.length - 1][1]] : [dest.lat, dest.lng]

  if (pickup) {
    const m = createCircleMarker(startLatLng, 'pickup', { location: pickup, zIndexOffset: 1000 })
      .bindTooltip('Pickup: ' + pickup.name, { direction: 'top', offset: [0, -12], className: 'wayz-tooltip' })
    m.on('click', () => {
      selectedDetail.value = getLandmarkDetail(pickup)
      map.panTo(startLatLng)
    })
    m.addTo(routeLayer)
  }

  if (dest) {
    const m = createCircleMarker(endLatLng, 'dest', { location: dest, zIndexOffset: 1000 })
      .bindTooltip('Dest: ' + dest.name, { direction: 'top', offset: [0, -12], className: 'wayz-tooltip' })
    m.on('click', () => {
      selectedDetail.value = getLandmarkDetail(dest)
      map.panTo(endLatLng)
    })
    m.addTo(routeLayer)
  }
}

async function drawRoute(pickup, dest) {
  if (!map) return
  if (routeLine) { map.removeLayer(routeLine); routeLine = null }

  updateRouteMarkers(pickup, dest)
  map.fitBounds(L.latLngBounds([[pickup.lat, pickup.lng], [dest.lat, dest.lng]]), { padding: [60, 60] })

  let distanceKm = haversineKm(pickup.lat, pickup.lng, dest.lat, dest.lng)
  let minutes = Math.ceil(distanceKm * 1.6)
  let geometry = [[pickup.lat, pickup.lng], [dest.lat, dest.lng]]

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`
    const res = await fetch(url)
    const data = await res.json()
    if (data.routes && data.routes.length) {
      distanceKm = data.routes[0].distance / 1000
      minutes = Math.ceil(data.routes[0].duration / 60)
      geometry = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]])
    }
  } catch (e) { /* use straight-line fallback */ }

  routeLine = L.polyline(geometry, { color: '#124f43', weight: 3, opacity: 0.9 }).addTo(map)
  updateRouteMarkers(pickup, dest, geometry)

  emit('update:routeDistance', `${distanceKm.toFixed(1)} km`)
  emit('update:routeDuration', `${minutes} min`)
}

function invalidateSize() {
  if (map) map.invalidateSize()
}

function panTo(lat, lng) {
  if (map) map.panTo([lat, lng])
}

defineExpose({ initMap, drawRoute, invalidateSize, plotLocations, panTo })

onMounted(() => {
  nextTick(() => {
    if (!map) initMap()
    invalidateSize()
  })
})

onUnmounted(() => {
  if (map) { map.remove(); map = null }
})

watch(() => [driverStore.pickup, driverStore.destination], ([pickup, dest]) => {
  if (pickup && dest && map) {
    drawRoute(pickup, dest)
  } else if (map && routeLayer) {
    routeLayer.clearLayers()
    if (routeLine) { map.removeLayer(routeLine); routeLine = null }
  }
})
</script>
