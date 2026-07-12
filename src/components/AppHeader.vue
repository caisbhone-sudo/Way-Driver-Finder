<template>
  <header>
    <div class="header-container">
      <button class="logo" @click="$router.push({ name: 'home' })" aria-label="Wayz Driver Finder">
        <span class="logo-icon">🚕</span>
        <span class="logo-text">
          <h1>Wayz</h1>
          <p>{{ t('brandSub') }}</p>
        </span>
      </button>

      <nav class="main-nav">
        <ul class="nav-links">
          <li v-for="item in navItems" :key="item.name">
            <a
              @click="navigate(item.name)"
              :class="{ active: isActive(item.name) }"
            >{{ t(item.label) }}</a>
          </li>
        </ul>
      </nav>

      <div class="header-actions">
        <div class="lang-toggle" role="group" aria-label="Language switch">
          <button
            type="button"
            class="lang-btn"
            :class="{ active: appStore.currentLang === 'en' }"
            @click="appStore.setLanguage('en')"
          >EN</button>
          <button
            type="button"
            class="lang-btn"
            :class="{ active: appStore.currentLang === 'my' }"
            @click="appStore.setLanguage('my')"
          >MY</button>
        </div>
        <button class="mobile-menu-toggle" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">☰</button>
      </div>
    </div>
    <div class="mobile-nav" :class="{ open: mobileOpen }">
      <a
        v-for="item in navItems" :key="'m-' + item.name"
        @click="navigate(item.name); mobileOpen = false"
        :class="{ active: isActive(item.name) }"
      >{{ t(item.label) }}</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from "vue-i18n"
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const { t } = useI18n()
const mobileOpen = ref(false)

const navItems = [
  { name: 'home', label: 'navHome' },
  { name: 'map', label: 'navMap' },
  { name: 'driverlist', label: 'navDriverList' },
  { name: 'services', label: 'navServices' },
  { name: 'about', label: 'navAbout' },
  { name: 'contact', label: 'navContact' }
]

function isActive(routeName) {
  return route.name === routeName
}

function navigate(routeName) {
  router.push({ name: routeName })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
