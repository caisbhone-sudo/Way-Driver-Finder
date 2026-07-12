<template>
  <footer>
    <div class="footer-inner">
      <div class="logo" style="cursor:default;">
        <span class="logo-icon">🚕</span>
        <span class="logo-text">
          <h1 style="color:#fff;">Wayz</h1>
          <p>{{ t('brandSub') }}</p>
        </span>
      </div>
      <div class="footer-links">
        <a @click="$router.push({ name: 'home' })">{{ t('navHome') }}</a>
        <a @click="$router.push({ name: 'driverlist' })">{{ t('navDriverList') }}</a>
        <a @click="$router.push({ name: 'services' })">{{ t('navServices') }}</a>
        <a @click="$router.push({ name: 'about' })">{{ t('navAbout') }}</a>
        <a @click="$router.push({ name: 'contact' })">{{ t('navContact') }}</a>
        <a href="tel:+95966450054">{{ t('callNow') }}</a>
      </div>
    </div>
    <div class="footer-bottom" v-html="t('footerBottomHtml')"></div>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>
