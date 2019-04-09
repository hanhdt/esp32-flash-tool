import Vue from 'vue'
import VueI18n from 'vue-i18n'
import EN from '../i18n/en'
import JA from '../i18n/ja'
import { remote } from 'electron'

Vue.use(VueI18n)

const messages = {
  en: EN,
  ja: JA
}

const i18n = new VueI18n({
  locale: remote.app.getLocale() === 'ja' ? 'ja' : 'en',
  fallbackLocale: 'ja',
  messages
})

export default i18n
