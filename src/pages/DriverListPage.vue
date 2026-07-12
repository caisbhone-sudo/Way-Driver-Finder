<template>
  <section id="driverlist" class="active">
    <SectionHeader
      :eyebrow="t('rosterEyebrow')"
      :title="t('rosterTitle')"
      :subtitle="t('rosterSub')"
    />

    <div class="search-card">
      <div class="search-card-title">🔎 {{ t('searchFleetTitle') }}</div>
      <div class="search-card-sub">{{ t('searchFleetSub') }}</div>
      <div class="roster-search-row">
        <input
          type="text"
          class="roster-search-input"
          :placeholder="t('rosterSearchPlaceholder')"
          v-model="searchQuery"
          @input="updateFilter"
          autocomplete="off"
        >
        <select class="roster-vehicle-filter" v-model="vehicleFilter" @change="updateFilter">
          <option value="">{{ t('allVehicleTypes') }}</option>
          <option v-for="v in store.vehicleTypes" :key="v" :value="v">{{ v }}</option>
        </select>
      </div>
      <div class="search-hint" v-text="countText"></div>
    </div>

    <div class="drivers-grid">
      <DriverCard
        v-for="d in filteredDrivers"
        :key="d.id"
        :driver="d"
        :dimmed="false"
        :base-name="getBaseName(d.base)"
      />
      <div v-if="filteredDrivers.length === 0" class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h4>No drivers match your search</h4>
        <p>Try a different name or vehicle type.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from "vue-i18n"
import { useDriverStore } from '@/stores/driverStore'
import SectionHeader from '@/components/SectionHeader.vue'
import DriverCard from '@/components/DriverCard.vue'

const { t } = useI18n()
const store = useDriverStore()

const searchQuery = ref('')
const vehicleFilter = ref('')

const filteredDrivers = computed(() => {
  return store.drivers.filter(d => {
    const matchesQuery = !searchQuery.value ||
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesVehicle = !vehicleFilter.value || d.vehicle === vehicleFilter.value
    return matchesQuery && matchesVehicle
  })
})

const countText = computed(() => {
  if (!searchQuery.value && !vehicleFilter.value) {
    return `${t('showingAll')} ${store.drivers.length} ${t('driversWord')}.`
  }
  return `${t('showing')} ${filteredDrivers.value.length} ${t('of')} ${store.drivers.length} ${t('driversWord')}.`
})

function getBaseName(baseId) {
  const loc = store.locations.find(l => l.id === baseId)
  return loc ? loc.name : baseId
}

function updateFilter() {
  // computed reacts automatically
}

onMounted(async () => {
  if (store.drivers.length === 0) {
    await store.loadData()
  }
})
</script>
