<template>
  <Teleport to="body">
    <div class="landmark-modal" :class="{ active: modelValue }" v-if="modelValue" @click.self="$emit('update:modelValue', false)">
      <div class="landmark-modal-card">
        <div class="landmark-modal-header">
          <h3>Landmarks in Naypyidaw</h3>
          <button class="landmark-close" type="button" @click="$emit('update:modelValue', false)">×</button>
        </div>
        <div class="landmark-modal-body">
          <button class="landmark-item" type="button" @click="openMap(19.7711, 96.1830)">Uppatasanti Pagoda</button>
          <button class="landmark-item" type="button" @click="openMap(19.7562, 96.0827)">Junction Centre</button>
          <button class="landmark-item" type="button" @click="openMap(19.7610, 96.0792)">Parliament House</button>
          <button class="landmark-item" type="button" @click="openMap(19.7630, 96.1030)">Water Fountain Garden</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({ modelValue: { type: Boolean, default: false } })
defineEmits(['update:modelValue'])

function openMap(lat, lng) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank', 'noopener,noreferrer')
}
</script>
