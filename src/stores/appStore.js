import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentLang = ref('en')

  function setLanguage(lang) {
    currentLang.value = lang
    localStorage.setItem('wayz-lang', lang)
    document.documentElement.setAttribute('lang', lang === 'my' ? 'my' : 'en')
    document.body.classList.toggle('lang-my', lang === 'my')
  }

  function initLanguage() {
    const saved = localStorage.getItem('wayz-lang')
    if (saved === 'en' || saved === 'my') {
      setLanguage(saved)
    }
  }

  return { currentLang, setLanguage, initLanguage }
})
