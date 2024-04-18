import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'zh',
  legacy: false,
  globalInjection: true,
  messages: {
    en: {
      ...en
    },
    zh: {
      ...zh
    }
    // en: {
    //   hello: 'hello!'
    // },
    // zh: {
    //   hello: 'こんにちは！'
    // }
  }
})
localStorage.setItem('langType', 'en')
export default i18n