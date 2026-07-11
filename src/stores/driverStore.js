import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchDrivers, fetchLocations } from '@/api/drivers'
import { LOCATIONS } from '@/utility/data'
import { haversineKm, nearestBaseHub } from '@/utility/helpers'

export const useDriverStore = defineStore('driver', () => {
  const drivers = ref([])
  const locations = ref([])
  const pickupId = ref('')
  const destId = ref('')
  const matchedDrivers = ref([])
  const isExactMatch = ref(true)
  const loading = ref(false)

  const locById = computed(() => {
    const map = {}
    locations.value.forEach(l => { map[l.id] = l })
    return map
  })

  const pickup = computed(() => locById.value[pickupId.value] || null)
  const destination = computed(() => locById.value[destId.value] || null)

  const baseLocations = computed(() =>
    locations.value.filter(l => l.base)
  )

  const availablePickupOptions = computed(() =>
    locations.value.filter(l => l.id !== destId.value)
  )

  const availableDestOptions = computed(() =>
    locations.value.filter(l => l.id !== pickupId.value && pickupId.value)
  )

  const vehicleTypes = computed(() =>
    [...new Set(drivers.value.map(d => d.vehicle))].sort()
  )

  async function loadData() {
    loading.value = true
    try {
      const [apiDrivers, apiLocations] = await Promise.all([
        fetchDrivers(),
        fetchLocations()
      ])
      drivers.value = apiDrivers
      locations.value = apiLocations.length > 0 ? apiLocations : LOCATIONS
    } catch {
      drivers.value = []
      locations.value = LOCATIONS
    } finally {
      loading.value = false
    }
  }

  function setPickup(id) {
    pickupId.value = id
    if (id === destId.value) destId.value = ''
    runSearch()
  }

  function setDestination(id) {
    destId.value = id
    runSearch()
  }

  function runSearch() {
    if (!pickupId.value || !destId.value) {
      matchedDrivers.value = []
      isExactMatch.value = true
      return
    }

    const pickup = locById.value[pickupId.value]
    if (!pickup) return

    const hub = nearestBaseHub(pickup, locations.value)
    if (!hub) return

    let matches = drivers.value.filter(
      d => d.base === hub.id && (d.routes || []).includes(destId.value)
    )
    isExactMatch.value = matches.length > 0

    if (matches.length === 0) {
      matches = drivers.value.filter(d => d.base === hub.id)
    }

    matchedDrivers.value = matches
  }

  function clearSelection() {
    pickupId.value = ''
    destId.value = ''
    matchedDrivers.value = []
  }

  return {
    drivers, locations, pickupId, destId, matchedDrivers,
    isExactMatch, loading, locById, pickup, destination,
    baseLocations, availablePickupOptions, availableDestOptions,
    vehicleTypes, loadData, setPickup, setDestination,
    runSearch, clearSelection
  }
})
