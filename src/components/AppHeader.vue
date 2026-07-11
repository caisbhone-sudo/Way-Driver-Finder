<template>
  <header>
    <div class="header-container">
      <button class="logo" @click="$router.push('/')" aria-label="Wayz Driver Finder">
        <span class="logo-icon">🚕</span>
        <span class="logo-text">
          <h1>Wayz</h1>
          <p>{{ $t('brandSub') }}</p>
        </span>
      </button>

      <nav class="main-nav">
        <ul class="nav-links">
          <li v-for="item in navItems" :key="item.route">
            <a
              @click="navigate(item.route, item.action)"
              :class="{ active: isActive(item.section) }"
              :data-section="item.section"
            >{{ $t(item.label) }}</a>
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
        v-for="item in navItems" :key="'m-' + item.route"
        @click="navigate(item.route, item.action); mobileOpen = false"
        :class="{ active: isActive(item.section) }"
      >{{ $t(item.label) }}</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const mobileOpen = ref(false)

const navItems = [
  { route: '/', section: 'home', label: 'navHome' },
  { route: '/drivers', section: 'drivers', label: 'navMap' },
  { route: '/driver-list', section: 'driverlist', label: 'navDriverList' },
  { route: '/services', section: 'services', label: 'navServices' },
  { route: '/about', section: 'about', label: 'navAbout' },
  { route: '/contact', section: 'contact', label: 'navContact' }
]

function isActive(section) {
  const routeName = String(route.name || '')
  return routeName === section
}

function navigate(path) {
  router.push(path)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
