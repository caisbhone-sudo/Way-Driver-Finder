<template>
  <section class="active">
    <SectionHeader
      :eyebrow="'FAQ'"
      :title="$t('faqTitle')"
      :subtitle="$t('faqSub')"
    />

    <div class="search-card" style="max-width:800px;margin:0 auto 30px;">
      <div class="why-grid">
        <div class="why-card" v-for="item in faqItems" :key="item.q">
          <h5>{{ item.q }}</h5>
          <p>{{ item.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'

const faqItems = [
  { q: 'How do I find a driver?', a: 'Go to the Map page, choose your pickup location and destination, then click Find Drivers. You will see a list of drivers who serve that route.' },
  { q: 'Do I need to create an account?', a: 'No. Wayz is account-free. Just search and call the driver directly.' },
  { q: 'How do I pay?', a: 'Payment is arranged directly with the driver. Wayz does not process payments.' },
  { q: 'Are drivers verified?', a: 'Yes. All drivers are licensed, background-checked, and linked to a fixed base location.' },
  { q: 'What areas do you serve?', a: 'We serve Naypyitaw and surrounding areas with 9 hub locations and 24 total pickup/destination points.' },
  { q: 'How can I contact dispatch?', a: 'Call +95 966 450 054 anytime — our dispatch line is open 24/7.' }
]
</script>
