<template>
  <div class="section-header">
    <span class="eyebrow" v-if="eyebrow">{{ eyebrow }}</span>
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
})
</script>
