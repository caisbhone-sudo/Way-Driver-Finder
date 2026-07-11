<template>
  <div class="driver-card" :class="{ dimmed }">
    <div class="driver-top">
      {{ driver.avatar }}
      <div class="driver-badge">🕓 {{ driver.experience }}</div>
    </div>
    <div class="driver-body">
      <div>
        <div class="driver-name">{{ driver.name }}</div>
        <div class="driver-base">{{ baseName }}</div>
      </div>
      <div class="driver-phone">
        <span>📞 <b>{{ driver.phone }}</b></span>
        <span>🕑 <b>{{ driver.experience }}</b></span>
      </div>
      <div class="driver-meta">
        <span>🚗 <b>{{ driver.vehicle }}</b></span>
        <span v-if="driver.carNumber">📌 <b>{{ driver.carNumber }}</b></span>
      </div>
      <a class="call-now-btn" :href="`tel:${driver.phone.replace(/\s+/g,'')}`">
        📞 {{ $t('callBtnPrefix') }} {{ driver.name.split(' ')[0] }} {{ $t('callBtnSuffix') }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  driver: { type: Object, required: true },
  dimmed: { type: Boolean, default: false },
  baseName: { type: String, default: '' }
})
</script>
