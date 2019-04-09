import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTheme: 'dark-theme',
    locale: 'ja',
    serialPort: '',
    initialOTADataFile: null,
    bootLoaderFile: null,
    appFile: null,
    partitionsTableFile: null,
    progressMessages: []
  },
  getters: {
    appTheme (state) {
      return state.appTheme
    },
    locale (state) {
      return state.locale
    },
    serialPort (state) {
      return state.serialPort
    },
    initialOTADataFile (state) {
      return state.initialOTADataFile
    },
    bootLoaderFile (state) {
      return state.bootLoaderFile
    },
    appFile (state) {
      return state.appFile
    },
    partitionsTableFile (state) {
      return state.partitionsTableFile
    },
    progressMessages (state) {
      return state.progressMessages
    }
  },
  mutations: {
    appTheme (state, theme) {
      state.appTheme = theme
      localStorage.setItem('appTheme', theme)
    },
    locale (state, locale) {
      state.locale = locale
    },
    serialPort (state, port) {
      state.serialPort = port
    },
    initialOTADataFile (state, otaDataFile) {
      state.initialOTADataFile = otaDataFile
    },
    bootLoaderFile (state, bootloader) {
      state.bootLoaderFile = bootloader
    },
    appFile (state, app) {
      state.appFile = app
    },
    partitionsTableFile (state, partitions) {
      state.partitionsTableFile = partitions
    },
    addProgressMessage (state, message) {
      state.progressMessages.push({ id: Date.now(), data: message })
    },
    clearProgressMessages (state) {
      if (state.progressMessages.length > 0) {
        state.progressMessages = []
      }
    }
  },
  actions: {
    updateAppTheme ({ commit }, theme) {
      commit('appTheme', theme)
    },
    updateLocale ({ commit }, locale) {
      commit('locale', locale)
    },
    updateSerialPort ({ commit }, port) {
      commit('serialPort', port)
    },
    updateOTADataFile ({ commit }, otaData) {
      commit('initialOTADataFile', otaData)
    },
    updateBootLoaderFile ({ commit }, bootloader) {
      commit('bootLoaderFile', bootloader)
    },
    updateAppFile ({ commit }, app) {
      commit('appFile', app)
    },
    updatePartitionsTableFile ({ commit }, partitions) {
      commit('partitionsTableFile', partitions)
    },
    updateProgress ({ commit }, message) {
      commit('addProgressMessage', message)
    },
    clearProgressMessages ({ commit }) {
      commit('clearProgressMessages')
    }
  }
})
