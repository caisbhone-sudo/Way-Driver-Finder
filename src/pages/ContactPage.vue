<template>
  <section id="contact" class="active">
    <div class="contact-container">
      <div class="contact-info">
        <h4>{{ $t('contactTitle') }}</h4>

        <div class="contact-item">
          <div class="contact-icon">📞</div>
          <div><h5>{{ $t('callUs') }}</h5><p>{{ $t('callUsSub') }}</p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">📧</div>
          <div><h5>{{ $t('emailUs') }}</h5><p>info@wayz-transport.com</p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">📍</div>
          <div><h5>{{ $t('headOffice') }}</h5><p>{{ $t('headOfficeSub') }}</p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">⏰</div>
          <div><h5>{{ $t('hours') }}</h5><p>{{ $t('hoursSub') }}</p></div>
        </div>

        <div class="contact-quick-actions">
          <a class="btn-gold" href="tel:+95966450054">{{ $t('callNow') }}</a>
          <a class="btn-outline-light" href="mailto:info@wayz-transport.com?subject=Ride%20Inquiry&body=Hi%20Wayz%20Transportation%20team,">{{ $t('emailNow') }}</a>
        </div>
      </div>

      <div>
        <form class="contact-form" @submit.prevent="handleSubmit">
          <input type="text" :placeholder="$t('yourName')" v-model="form.name" required>
          <input type="email" :placeholder="$t('yourEmail')" v-model="form.email" required>
          <input type="text" :placeholder="$t('subject')" v-model="form.subject" required>
          <textarea :placeholder="$t('yourMessage')" v-model="form.message" required></textarea>
          <button type="submit">{{ $t('sendMessage') }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/composables/useToast'
import { submitContact } from '@/api/drivers'

const { t } = useI18n()
const { showToast } = useToast()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

async function handleSubmit() {
  const result = await submitContact({ ...form })
  if (result.success) {
    showToast(t('messageSent'))
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } else {
    showToast(result.error || 'Failed to send message', 'error')
  }
}
</script>
