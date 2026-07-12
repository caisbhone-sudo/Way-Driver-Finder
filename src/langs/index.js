import { createI18n } from 'vue-i18n'
import en from './en'
import mm from './mm'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
  messages: { en, mm }
})

export default i18n
