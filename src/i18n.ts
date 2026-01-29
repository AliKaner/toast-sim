import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

const savedLocale = localStorage.getItem('user-locale') || 'en'

const i18n = createI18n({
  legacy: false, // Usage of Composition API
  locale: savedLocale,
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    tr
  }
})

export default i18n
