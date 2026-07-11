<template>
  <aside class="passenger-panel" v-if="detail">
    <div class="passenger-panel-header">Location Details</div>
    <div class="passenger-panel-body">
      <img class="passenger-panel-image" :src="detail.image" :alt="detail.title">
      <div class="passenger-panel-title">{{ detail.title }}</div>
      <div class="passenger-panel-desc">{{ detail.description }}</div>
    </div>
  </aside>
  <aside class="passenger-panel" v-else>
    <div class="passenger-panel-header">Location Details</div>
    <div class="passenger-panel-body">
      <p class="passenger-panel-placeholder">Select a landmark on the map to view its details.</p>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  detail: { type: Object, default: null }
})
</script>
