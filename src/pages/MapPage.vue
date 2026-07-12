<template>
  <section id="drivers" class="active">
    <SectionHeader
      :eyebrow="t('driversEyebrow')"
      :title="t('driversTitle')"
      :subtitle="t('driversSub')"
    />

    <div class="search-card">
      <div class="search-card-title">📍 {{ t('planRouteTitle') }}</div>
      <div class="search-card-sub">{{ t('planRouteSub') }}</div>
      <div class="search-grid">
        <div class="form-group">
          <div class="form-group-head">
            <label>{{ t('pickupLabel') }}</label>
          </div>
          <select v-model="store.pickupId" @change="onPickupChange">
            <option value="">{{ t('selectPickup') }}</option>
            <option v-for="loc in store.availablePickupOptions" :key="loc.id" :value="loc.id">
              {{ loc.name }} {{ loc.base ? '— ' + t('hubTag') : '' }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <div class="form-group-head"><label>{{ t('destLabel') }}</label></div>
          <select v-model="store.destId" @change="onDestChange" :disabled="!store.pickupId">
            <option value="">{{ store.pickupId ? t('selectDestination') : t('selectPickupFirst') }}</option>
            <option v-for="loc in store.availableDestOptions" :key="loc.id" :value="loc.id">
              {{ loc.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="route-panel" :class="{ active: store.pickup && store.destination }">
      <RouteMeter
        :pickup="store.pickup"
        :destination="store.destination"
        :distance="routeDistance"
        :duration="routeDuration"
      />
      <DriverMap
        ref="mapRef"
        v-if="showMap"
        @update:routeDistance="routeDistance = $event"
        @update:routeDuration="routeDuration = $event"
        @mapClick="onMapClick"
      />
    </div>

    <div class="drivers-grid">
      <div v-if="!store.pickupId || !store.destId" class="empty-state">
        <div class="empty-state-icon">🧭</div>
        <h4>{{ t('emptyChooseTitle') }}</h4>
        <p>{{ t('emptyChooseSub') }}</p>
      </div>
      <div v-else-if="store.matchedDrivers.length === 0" class="empty-state">
        <div class="empty-state-icon">🚕</div>
        <h4>{{ t('noDriversTitle') }}</h4>
        <p>{{ t('noDriversSubA') }} <strong>{{ store.pickup?.name }}</strong> {{ t('noDriversSubB') }} <strong>{{ store.destination?.name }}</strong>. {{ t('noDriversSubC') }}</p>
        <a class="call-now-btn" style="display:inline-flex;max-width:260px;" href="tel:+95966450054">📞 {{ t('callDispatch') }}</a>
      </div>
      <template v-else>
        <div v-if="!store.isExactMatch" class="route-note">🚕 {{ t('noExactRouteNote') }}</div>
        <DriverCard
          v-for="d in store.matchedDrivers"
          :key="d.id"
          :driver="d"
          :base-name="getBaseName(d.base)"
        />
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onActivated, nextTick } from 'vue'
import { useI18n } from "vue-i18n"
import { useDriverStore } from '@/stores/driverStore'
import SectionHeader from '@/components/SectionHeader.vue'
import RouteMeter from '@/components/RouteMeter.vue'
import DriverMap from '@/components/DriverMap.vue'
import DriverCard from '@/components/DriverCard.vue'

const { t } = useI18n()
const store = useDriverStore()

const mapRef = ref(null)
const showMap = ref(false)
const routeDistance = ref('--')
const routeDuration = ref('--')

function getBaseName(baseId) {
  const loc = store.locations.find(l => l.id === baseId)
  return loc ? loc.name : baseId
}

function onPickupChange() {
  if (store.pickupId && store.destId) {
    store.runSearch()
  } else {
    store.matchedDrivers = []
  }
}

function onDestChange() {
  if (store.pickupId && store.destId) {
    store.runSearch()
  }
}

function onMapClick(latlng) {
  // Map click handled by DriverMap internally for manual mode
}

onMounted(async () => {
  if (store.locations.length === 0) {
    await store.loadData()
  }
  showMap.value = true
  await nextTick()
  if (mapRef.value) {
    mapRef.value.initMap()
  }
})
</script>
