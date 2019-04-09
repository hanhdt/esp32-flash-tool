import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTheme: 'dark-theme',
    locale: 'ja'
  },
  getters: {
    appTheme (state) {
      return state.appTheme
    },
    locale (state) {
      return state.locale
    }
  },
  mutations: {
    appTheme (state, theme) {
      // Save app theme
      state.appTheme = theme
      localStorage.setItem('appTheme', theme)
    },
    locale (state, locale) {
      state.locale = locale
    }
  },
  actions: {
    updateAppTheme ({ commit }, theme) {
      commit('appTheme', theme)
    },
    updateLocale ({ commit }, locale) {
      commit('locale', locale)
    }
  }
})
