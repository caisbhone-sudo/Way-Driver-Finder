<template>
  <Teleport to="body">
    <div class="toast" :class="{ active: visible, error: type === 'error' }">
      {{ message }}
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { message, visible, type } = useToast()
</script>
