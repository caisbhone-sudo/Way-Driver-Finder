import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/langs'

export const useAppStore = defineStore('app', () => {
  const currentLang = ref(i18n.global.locale.value)

  function setLanguage(lang) {
    currentLang.value = lang
    i18n.global.locale.value = lang
    localStorage.setItem('wayz-lang', lang)
    document.documentElement.setAttribute('lang', lang === 'mm' ? 'my' : 'en')
    document.body.classList.toggle('lang-my', lang === 'mm')
  }

  return { currentLang, setLanguage }
})
