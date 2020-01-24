import { ipcRenderer } from 'electron'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

function isEmptyString (value) {
  return (typeof value === 'string' && !value.trim()) ||
    typeof value === 'undefined' ||
    value === null
}

export default new Vuex.Store({
  state: {
    chip: 'esp32',
    flashMode: 'dio',
    flashFreq: '80m',
    flashSize: '4MB',
    baudRate: 460800,
    beforeFlash: 'default_reset',
    afterFlash: 'hard_reset',
    inProgress: false,
    appTheme: 'dark-theme',
    locale: 'en',
    serialPort: null,
    bootLoaderName: '',
    bootLoaderFile: null,
    bootLoaderOffset: '',
    initialOTADataName: '',
    initialOTADataFile: null,
    initialOTADataOffset: '',
    partitionsTableName: '',
    partitionsTableFile: null,
    partitionsTableOffset: '',
    factorySerialName: '',
    factorySerialFile: null,
    factorySerialOffset: '',
    appName: '',
    appFile: null,
    appOffset: '',
    progressMessages: [],
    flashingStatus: 0,
    connectedDevices: [],
    currentDevice: null,
    singleFirmwareFile: null
  },
  getters: {
    chip (state) {
      return state.chip
    },
    flashMode (state) {
      return state.flashMode
    },
    flashFreq (state) {
      return state.flashFreq
    },
    flashSize (state) {
      return state.flashSize
    },
    baudRate (state) {
      return state.baudRate
    },
    beforeFlash (state) {
      return state.beforeFlash
    },
    afterFlash (state) {
      return state.afterFlash
    },
    inProgress (state) {
      return state.inProgress
    },
    appTheme (state) {
      return state.appTheme
    },
    locale (state) {
      return state.locale
    },
    serialPort (state) {
      return state.serialPort
    },
    bootLoaderName (state) {
      return state.bootLoaderName
    },
    bootLoaderFile (state) {
      return state.bootLoaderFile
    },
    bootLoaderOffset (state) {
      return state.bootLoaderOffset
    },
    initialOTADataName (state) {
      return state.initialOTADataName
    },
    initialOTADataFile (state) {
      return state.initialOTADataFile
    },
    initialOTADataOffset (state) {
      return state.initialOTADataOffset
    },
    partitionsTableName (state) {
      return state.partitionsTableName
    },
    partitionsTableFile (state) {
      return state.partitionsTableFile
    },
    partitionsTableOffset (state) {
      return state.partitionsTableOffset
    },
    factorySerialName (state) {
      return state.factorySerialName
    },
    factorySerialFile (state) {
      return state.factorySerialFile
    },
    factorySerialOffset (state) {
      return state.factorySerialOffset
    },
    appName (state) {
      return state.appName
    },
    appFile (state) {
      return state.appFile
    },
    appOffset (state) {
      return state.appOffset
    },
    progressMessages (state) {
      return state.progressMessages
    },
    connectedDevices (state) {
      return state.connectedDevices
    },
    currentDevice (state) {
      return state.currentDevice
    },
    singleFirmwareFile (state) {
      return state.singleFirmwareFile
    },
    flashingStatus (state) {
      return state.flashingStatus
    },
    isReadyFlashing (state) {
      return !isEmptyString(state.bootLoaderFile) &&
        !isEmptyString(state.initialOTADataFile) &&
        !isEmptyString(state.partitionsTableFile) &&
        !isEmptyString(state.appFile)
    }
  },
  mutations: {
    setChip (state, chip) {
      state.chip = chip
    },
    setFlashMode (state, flashMode) {
      state.flashMode = flashMode
    },
    setFlashFreq (state, flashFreq) {
      state.flashFreq = flashFreq
    },
    setFlashSize (state, flashSize) {
      state.flashSize = flashSize
    },
    setBaudRate (state, rate) {
      state.baudRate = rate
    },
    inProgress (state, status) {
      state.inProgress = status
    },
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
    bootLoaderName (state, bootLoaderName) {
      state.bootLoaderName = bootLoaderName
    },
    bootLoaderFile (state, bootLoader) {
      state.bootLoaderFile = bootLoader
    },
    bootLoaderOffset (state, bootLoaderOffset) {
      state.bootLoaderOffset = bootLoaderOffset
    },
    initialOTADataName (state, otaDataName) {
      state.initialOTADataName = otaDataName
    },
    initialOTADataFile (state, otaDataFile) {
      state.initialOTADataFile = otaDataFile
    },
    initialOTADataOffset (state, initialOTADataOffset) {
      state.initialOTADataOffset = initialOTADataOffset
    },
    partitionsTableName (state, partitionsTableName) {
      state.partitionsTableName = partitionsTableName
    },
    partitionsTableFile (state, partitions) {
      state.partitionsTableFile = partitions
    },
    partitionsTableOffset (state, partitionsTableOffset) {
      state.partitionsTableOffset = partitionsTableOffset
    },
    factorySerialName (state, serialName) {
      state.factorySerialName = serialName
    },
    factorySerialFile (state, factorySerial) {
      state.factorySerialFile = factorySerial
    },
    factorySerialOffset (state, factorySerialOffset) {
      state.factorySerialOffset = factorySerialOffset
    },
    appName (state, appName) {
      state.appName = appName
    },
    appFile (state, app) {
      state.appFile = app
    },
    appOffset (state, appOffset) {
      state.appOffset = appOffset
    },
    addProgressMessage (state, message) {
      if (!state.progressMessages.includes(message)) {
        state.progressMessages.push(message)
      }
    },
    clearProgressMessages (state) {
      if (state.progressMessages.length > 0) {
        state.progressMessages = []
      }
    },
    addConnectedDevice (state, device) {
      let isExisted = false
      state.connectedDevices.forEach((connectedDevice) => {
        if (connectedDevice.comName === device.comName) {
          isExisted = true
        }
      })

      if (!state.connectedDevices.includes(device) && !isExisted) {
        state.connectedDevices.push(device)
      }
    },
    removeConnectedDevice (state, device) {
      state.connectedDevices = state.connectedDevices
        .filter((connectedDevice) => connectedDevice !== device)
    },
    resetConnectedDevices (state) {
      state.connectedDevices = []
    },
    currentDevice (state, device) {
      state.currentDevice = device
    },
    singleFirmwareFile (state, filePath) {
      state.singleFirmwareFile = filePath
      ipcRenderer.send('unzip-firmware-file', state.singleFirmwareFile)
    },
    flashingStatus (state, status) {
      state.flashingStatus = status
    }
  },
  actions: {
    updateChip ({ commit }, chip) {
      commit('setChip', chip)
    },
    updateFlashMode ({ commit }, mode) {
      commit('setFlashMode', mode)
    },
    updateFlashFreq ({ commit }, freq) {
      commit('setFlashFreq', freq)
    },
    updateFlashSize ({ commit }, size) {
      commit('setFlashSize', size)
    },
    updateBaudRate ({ commit }, rate) {
      commit('setBaudRate', rate)
    },
    updateInProgress ({ commit }, status) {
      commit('inProgress', status)
    },
    updateAppTheme ({ commit }, theme) {
      commit('appTheme', theme)
    },
    updateLocale ({ commit }, locale) {
      commit('locale', locale)
    },
    updateSerialPort ({ commit }, port) {
      commit('serialPort', port)
    },
    updateBootLoaderName ({ commit }, bootLoaderName) {
      commit('bootLoaderName', bootLoaderName)
    },
    updateBootLoaderFile ({ commit }, bootLoader) {
      commit('bootLoaderFile', bootLoader)
    },
    updateBootLoaderOffset ({ commit }, bootLoaderOffset) {
      commit('bootLoaderOffset', bootLoaderOffset)
    },
    updateOTADataName ({ commit }, otaDataName) {
      commit('initialOTADataName', otaDataName)
    },
    updateOTADataFile ({ commit }, otaData) {
      commit('initialOTADataFile', otaData)
    },
    updateOTADataOffset ({ commit }, otaDataOffset) {
      commit('initialOTADataOffset', otaDataOffset)
    },
    updatePartitionsTableName ({ commit }, partitionsTableName) {
      commit('partitionsTableName', partitionsTableName)
    },
    updatePartitionsTableFile ({ commit }, partitions) {
      commit('partitionsTableFile', partitions)
    },
    updatePartitionsTableOffset ({ commit }, partitionsTableOffset) {
      commit('partitionsTableOffset', partitionsTableOffset)
    },
    updateFactorySerialName ({ commit }, serialName) {
      commit('factorySerialName', serialName)
    },
    updateFactorySerialFile ({ commit }, serial) {
      commit('factorySerialFile', serial)
    },
    updateFactorySerialOffset ({ commit }, serialOffset) {
      commit('factorySerialOffset', serialOffset)
    },
    updateAppName ({ commit }, appName) {
      commit('appName', appName)
    },
    updateAppFile ({ commit }, app) {
      commit('appFile', app)
    },
    updateAppOffset ({ commit }, appOffset) {
      commit('appOffset', appOffset)
    },
    updateProgress ({ commit }, message) {
      commit('addProgressMessage', message)
    },
    clearProgressMessages ({ commit }) {
      commit('clearProgressMessages')
    },
    addConnectedDevice ({ commit }, device) {
      commit('addConnectedDevice', device)
    },
    removeConnectedDevice ({ commit }, device) {
      commit('removeConnectedDevice', device)
    },
    resetConnectedDevices ({ commit }) {
      commit('resetConnectedDevices')
    },
    updateCurrentDevice ({ commit }, device) {
      commit('currentDevice', device)
    },
    updateSingleFirmwareFile ({ commit }, filePath) {
      commit('singleFirmwareFile', filePath)
    },
    updateFlashingStatus ({ commit }, status) {
      commit('flashingStatus', status)
    }
  }
})
