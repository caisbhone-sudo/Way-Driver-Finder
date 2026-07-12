<template>
  <div class="driver-card" :class="{ dimmed }">
    <div class="driver-top">
      <div class="driver-avatar">{{ driver.avatar }}</div>
      <div class="driver-rating">
        <span class="stars">{{ '★'.repeat(Math.round(driver.rating)) }}{{ '☆'.repeat(5 - Math.round(driver.rating)) }}</span>
        <span class="rating-num">{{ driver.rating }}</span>
        <span class="reviews">({{ driver.reviews }})</span>
      </div>
    </div>

    <div class="driver-body">
      <div class="driver-name">{{ driver.name }}</div>

      <div class="driver-info-grid">
        <div class="info-row">
          <span class="info-icon">🚗</span>
          <span class="info-text">{{ driver.vehicle }}</span>
        </div>
        <div class="info-row" v-if="driver.carNumber">
          <span class="info-icon">📌</span>
          <span class="info-text">{{ driver.carNumber }}</span>
        </div>
        <div class="info-row">
          <span class="info-icon">📍</span>
          <span class="info-text">{{ baseName }}</span>
        </div>
        <div class="info-row">
          <span class="info-icon">🕓</span>
          <span class="info-text">{{ driver.experience }} experience</span>
        </div>
      </div>

      <a class="call-now-btn" :href="`tel:${driver.phone.replace(/\s+/g,'')}`">
        <span class="phone-number">{{ driver.phone }}</span>
        <span class="call-label">{{ t('callBtnPrefix') }} {{ driver.name.split(' ')[0] }} {{ t('callBtnSuffix') }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"

const { t } = useI18n()

defineProps({
  driver: { type: Object, required: true },
  dimmed: { type: Boolean, default: false },
  baseName: { type: String, default: '' }
})
</script>
