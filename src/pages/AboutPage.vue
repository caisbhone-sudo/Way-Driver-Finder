<template>
  <section id="about" class="active">
    <div class="about-container">
      <div class="about-content">
        <span class="eyebrow">{{ $t('aboutEyebrow') }}</span>
        <h4>{{ $t('aboutTitle') }}</h4>
        <p>{{ $t('aboutP1') }}</p>
        <p>{{ $t('aboutP2') }}</p>
        <div class="about-highlights">
          <div class="highlight" v-for="hl in highlights" :key="hl.title">
            <div class="highlight-icon">✓</div>
            <div><h5>{{ $t(hl.title) }}</h5><p>{{ $t(hl.sub) }}</p></div>
          </div>
        </div>
      </div>
      <div class="about-image">
        🚕
        <div class="about-stats">
          <div><div class="val">9</div><div class="lbl">Hubs</div></div>
          <div><div class="val">17</div><div class="lbl">Drivers</div></div>
          <div><div class="val">24</div><div class="lbl">Locations</div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const highlights = [
  { title: 'hl1Title', sub: 'hl1Sub' },
  { title: 'hl2Title', sub: 'hl2Sub' },
  { title: 'hl3Title', sub: 'hl3Sub' },
  { title: 'hl4Title', sub: 'hl4Sub' }
]
</script>
