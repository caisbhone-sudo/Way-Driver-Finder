<template>
  <div class="meter-card" v-if="pickup && destination">
    <div class="meter-title">{{ $t('routeMeter') }}</div>
    <div class="meter-route"><b>{{ pickup.name }}</b> → <b>{{ destination.name }}</b></div>
    <div class="meter-readout">
      <div class="meter-box">
        <div class="val">{{ distance }}</div>
        <div class="lbl">{{ $t('distanceLbl') }}</div>
      </div>
      <div class="meter-box">
        <div class="val">{{ duration }}</div>
        <div class="lbl">{{ $t('durationLbl') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pickup: { type: Object, default: null },
  destination: { type: Object, default: null },
  distance: { type: String, default: '--' },
  duration: { type: String, default: '--' }
})
</script>
