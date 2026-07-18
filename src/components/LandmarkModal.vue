<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="landmark-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="t('servicesModalTitle')"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="landmark-card">
          <!-- Header -->
          <div class="landmark-header">
            <div>
              <div class="landmark-title">{{ t('servicesModalTitle') }}</div>
              <div class="landmark-sub">{{ t('servicesModalSubtitle') }}</div>
            </div>
            <button
              class="landmark-close"
              type="button"
              :aria-label="t('closeModal')"
              @click="$emit('update:modelValue', false)"
            >×</button>
          </div>

          <!-- Scrollable list of 28 places -->
          <div class="landmark-body">
            <a
              v-for="place in places"
              :key="place.key"
              href="#"
              class="landmark-item"
              @click.prevent="openMap(place.query)"
            >
              <span class="landmark-item-icon">{{ place.icon }}</span>
              <span class="landmark-item-text">
                <strong>{{ t(place.key) }}</strong>
                <small>{{ t('servicesModalOpenMaps') }}</small>
              </span>
              <span class="landmark-item-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineProps({ modelValue: { type: Boolean, default: false } })
defineEmits(['update:modelValue'])

const { t } = useI18n()

// 28 landmarks — query is the exact Google Maps search string
const places = [
  { key: 'servicesPlaceUppatasanti',    icon: '🛕', query: 'Uppatasanti Pagoda Naypyidaw' },
  { key: 'servicesPlaceParliament',     icon: '🏛️', query: 'Parliament House Hluttaw Naypyidaw' },
  { key: 'servicesPlaceJunction',       icon: '🏬', query: 'Junction Centre Naypyidaw' },
  { key: 'servicesPlaceWater',          icon: '⛲', query: 'Water Fountain Garden Naypyidaw' },
  { key: 'servicesPlaceLandmark',       icon: '🗺️', query: 'National Landmark Garden Naypyidaw' },
  { key: 'servicesPlaceZoo',            icon: '🦒', query: 'Zoological Garden Safari Park Naypyidaw' },
  { key: 'servicesPlaceGem',            icon: '💎', query: 'Gem Museum Naypyidaw' },
  { key: 'servicesPlaceOcean',          icon: '🛒', query: 'Ocean Supercenter Naypyidaw' },
  { key: 'servicesPlaceRailway',        icon: '🚉', query: 'Naypyidaw Railway Station' },
  { key: 'servicesPlaceTatmadaw',       icon: '🏅', query: 'Tatmadaw Museum Naypyidaw' },
  { key: 'servicesPlaceSafari',         icon: '🦁', query: 'Safari Park Naypyidaw' },
  { key: 'servicesPlaceMaravijaya',     icon: '🙏', query: 'Maravijaya Buddha Image Naypyidaw' },
  { key: 'servicesPlaceThabyegone',     icon: '🛍️', query: 'Thabyegone Market Naypyidaw' },
  { key: 'servicesPlaceMyoma',          icon: '🛍️', query: 'Myoma Market Naypyidaw' },
  { key: 'servicesPlaceCapitalHyper',   icon: '🏪', query: 'Capital Hypermarket Naypyidaw' },
  { key: 'servicesPlaceWunna',          icon: '🏟️', query: 'Wunna Theikdi Stadium Naypyidaw' },
  { key: 'servicesPlaceZayar',          icon: '🏟️', query: 'Zayar Thiri Stadium Naypyidaw' },
  { key: 'servicesPlaceHotelZone',      icon: '🏨', query: 'Hotel Zone Naypyidaw' },
  { key: 'servicesPlaceDefense',        icon: '🪖', query: 'Defense Services Museum Naypyidaw' },
  { key: 'servicesPlaceHlayKhwin',      icon: '⛰️', query: 'Hlay Khwin Taung Viewpoint Naypyidaw' },
  { key: 'servicesPlaceYanaungmyin',    icon: '🛕', query: 'Yanaungmyin Pagoda Naypyidaw' },
  { key: 'servicesPlaceShweSeKhon',     icon: '🛕', query: 'Shwe Se Khon Pagoda Naypyidaw' },
  { key: 'servicesPlacePaungLaung',     icon: '🌊', query: 'Paung Laung Dam Naypyidaw' },
  { key: 'servicesPlacePostOffice',     icon: '📮', query: 'Naypyidaw Post Office' },
  { key: 'servicesPlaceMinistry',       icon: '🏢', query: 'Ministry Zone Naypyidaw' },
  { key: 'servicesPlaceSkyPalace',      icon: '🏨', query: 'Sky Palace Hotel Naypyidaw' },
  { key: 'servicesPlaceJunctionCineplex', icon: '🎬', query: 'Junction Center Cineplex Naypyidaw' },
  { key: 'servicesPlaceAirport',        icon: '✈️', query: 'Naypyidaw Airport NYT' },
]

function openMap(query) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query).replace(/%20/g, '+')}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
/* Overlay */
.landmark-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 22, 16, 0.72);
  backdrop-filter: blur(8px);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Card */
.landmark-card {
  width: min(720px, 100%);
  max-height: min(88vh, 780px);
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(8, 41, 35, 0.97), rgba(14, 77, 63, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.4);
  position: relative;
  color: #f7fff9;
  overflow: hidden;
}
.landmark-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(215, 164, 65, 0.28);
  pointer-events: none;
  z-index: 1;
}

/* Header */
.landmark-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 26px 28px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}
.landmark-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--gold-light, #f1c874);
  margin-bottom: 4px;
}
.landmark-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
}
.landmark-close {
  background: rgba(255, 255, 255, 0.12);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 22px;
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}
.landmark-close:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: rotate(90deg);
}

/* Scrollable body */
.landmark-body {
  overflow-y: auto;
  padding: 16px 28px 24px;
  display: grid;
  gap: 8px;
  flex: 1;
}

/* Each landmark row */
.landmark-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.09);
  text-decoration: none;
  color: #fff;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.landmark-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
.landmark-item-icon {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
  width: 32px;
  text-align: center;
}
.landmark-item-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.landmark-item-text strong {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.landmark-item-text small {
  font-size: 11px;
  color: var(--gold-light, #f1c874);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.landmark-item-arrow {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s ease, transform 0.2s ease;
}
.landmark-item:hover .landmark-item-arrow {
  color: var(--gold-light, #f1c874);
  transform: translate(2px, -2px);
}

/* Scrollbar styling */
.landmark-body::-webkit-scrollbar { width: 5px; }
.landmark-body::-webkit-scrollbar-track { background: transparent; }
.landmark-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
.landmark-body::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.35); }

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .landmark-card,
.modal-fade-leave-active .landmark-card {
  transition: transform 0.25s ease;
}
.modal-fade-enter-from .landmark-card,
.modal-fade-leave-to .landmark-card {
  transform: scale(0.96) translateY(12px);
}

/* Mobile */
@media (max-width: 560px) {
  .landmark-header { padding: 20px 18px 14px; }
  .landmark-body { padding: 12px 18px 20px; }
  .landmark-title { font-size: 18px; }
}
</style>
