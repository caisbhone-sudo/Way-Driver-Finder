<template>
  <section id="services" class="active">
    <SectionHeader
      :eyebrow="t('servicesEyebrow')"
      :title="t('servicesTitle')"
      :subtitle="t('servicesSub')"
    />

    <div class="city-tour-card">
      <div class="city-tour-media">🗺️</div>
      <div class="city-tour-info">
        <span class="eyebrow">{{ t('featuredRoute') }}</span>
        <h4>{{ t('cityTourTitle') }}</h4>
        <p>{{ t('cityTourSub') }}</p>
        <div class="city-tour-actions">
          <button class="btn-outline-light" type="button" @click="showModal = true">
            {{ t('viewOnMap') }}
          </button>
        </div>
      </div>
    </div>

    <LandmarkModal v-model="showModal" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from "vue-i18n"
import SectionHeader from '@/components/SectionHeader.vue'
import LandmarkModal from '@/components/LandmarkModal.vue'

const { t } = useI18n()

const showModal = ref(false)
</script>
