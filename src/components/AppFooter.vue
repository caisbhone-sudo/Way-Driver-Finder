<template>
  <footer>
    <div class="footer-inner">
      <div class="logo" style="cursor:default;">
        <span class="logo-icon">🚕</span>
        <span class="logo-text">
          <h1 style="color:#fff;">Wayz</h1>
          <p>{{ $t('brandSub') }}</p>
        </span>
      </div>
      <div class="footer-links">
        <a @click="$router.push('/')">{{ $t('navHome') }}</a>
        <a @click="$router.push('/driver-list')">{{ $t('navDriverList') }}</a>
        <a @click="$router.push('/services')">{{ $t('navServices') }}</a>
        <a @click="$router.push('/about')">{{ $t('navAbout') }}</a>
        <a @click="$router.push('/contact')">{{ $t('navContact') }}</a>
        <a href="tel:+95966450054">{{ $t('callNow') }}</a>
      </div>
    </div>
    <div class="footer-bottom" v-html="$t('footerBottomHtml')"></div>
  </footer>
</template>
