<template>
  <section class="active">
    <SectionHeader
      :eyebrow="'Account'"
      :title="$t('profileTitle')"
      :subtitle="$t('profileSub')"
    />

    <div class="search-card" style="max-width:600px;margin:0 auto;">
      <form class="contact-form" @submit.prevent="handleSave">
        <input type="text" placeholder="Full Name" v-model="profile.name">
        <input type="email" placeholder="Email" v-model="profile.email">
        <input type="text" placeholder="Phone" v-model="profile.phone">
        <button type="submit">Save Profile</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useToast } from '@/composables/useToast'
import SectionHeader from '@/components/SectionHeader.vue'

const { showToast } = useToast()

const profile = reactive({
  name: '',
  email: '',
  phone: ''
})

function handleSave() {
  showToast('Profile saved successfully')
}
</script>
