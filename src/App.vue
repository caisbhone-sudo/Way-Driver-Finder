<template>
  <MainLayout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </MainLayout>
  <ToastNotification />
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import { useAppStore } from '@/stores/appStore'
import { onMounted } from 'vue'

const appStore = useAppStore()

onMounted(() => {
  // Language already synced at store module level; ensure DOM classes are applied
  document.documentElement.setAttribute('lang', appStore.currentLang === 'mm' ? 'my' : 'en')
  document.body.classList.toggle('lang-my', appStore.currentLang === 'mm')
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
