<template>
  <section id="home" class="active">
    <div class="hero">
      <svg class="hero-skyline" viewBox="0 0 1200 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,220 L0,150 L60,150 L60,120 L90,120 L90,150 L150,150 L150,100 L180,60 L210,100 L210,150 L280,150 L280,130 L320,130 L320,150 L400,150 L400,90 L430,50 L440,30 L450,50 L460,90 L460,150 L560,150 L560,110 L600,110 L600,150 L680,150 L680,70 L710,35 L720,20 L730,35 L740,70 L740,150 L820,150 L820,120 L860,120 L860,150 L940,150 L940,100 L970,60 L1000,100 L1000,150 L1080,150 L1080,130 L1120,130 L1120,150 L1200,150 L1200,220 Z" fill="#082019" opacity="0.75"></path>
      </svg>
      <div class="hero-content">
        <span class="eyebrow">{{ $t('heroEyebrow') }}</span>
        <h2 v-html="$t('heroTitleHtml')"></h2>
        <p>{{ $t('heroSub') }}</p>
        <div class="hero-buttons">
          <button class="btn-gold" @click="$router.push('/drivers')">{{ $t('heroBtnFind') }}</button>
          <a class="btn-outline-light" href="tel:+95966450054">{{ $t('heroBtnDispatch') }}</a>
        </div>
      </div>
      <div class="trust-strip">
        <div class="trust-item"><div class="num">18</div><div class="lbl">{{ $t('trustHubs') }}</div></div>
        <div class="trust-item"><div class="num">45</div><div class="lbl">{{ $t('trustDrivers') }}</div></div>
        <div class="trust-item"><div class="num">24/7</div><div class="lbl">{{ $t('trustDispatch') }}</div></div>
      </div>
    </div>

    <div class="home-body">
      <SectionHeader
        :eyebrow="$t('whyEyebrow')"
        :title="$t('whyTitle')"
        :subtitle="$t('whySub')"
        style="margin-bottom:10px;"
      />
      <div class="why-grid">
        <div class="why-card" v-for="card in whyCards" :key="card.title">
          <div class="why-icon">{{ card.icon }}</div>
          <h5>{{ $t(card.title) }}</h5>
          <p>{{ $t(card.sub) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'

const whyCards = [
  { icon: '🪪', title: 'why1Title', sub: 'why1Sub' },
  { icon: '🗺️', title: 'why2Title', sub: 'why2Sub' },
  { icon: '💳', title: 'why3Title', sub: 'why3Sub' },
  { icon: '📞', title: 'why4Title', sub: 'why4Sub' }
]
</script>
