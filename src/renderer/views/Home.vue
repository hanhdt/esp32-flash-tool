<template>
  <div class="home">
    <div class="container">
      <b-card
        class="mb-2"
        bg-variant="light"
        header="Aroma Shooter Firmware Flashing Tool"
      >
        <b-card-body>
          <b-form>
            <b-form-group
              label="Serial port:"
              label-for="serialPortInput"
            >
              <div class="devices__select">
                <b-form-select
                  id="serialPortInput"
                  v-model="selectedSerialPort"
                  :options="deviceOptions"
                />
              </div>
            </b-form-group>
            <b-form-group
              label="Firmware image:"
            >
              <b-form-file
                v-model="selectedSingleFirmwareFile"
                :state="Boolean(selectedSingleFirmwareFile)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                accept="application/zip"
              ></b-form-file>
            </b-form-group>

            <b-button
              v-b-toggle.collapse-progress
              @click.prevent="onFlashingSubmit"
              variant="success"
              :disabled="inProgress || !isReadyFlashing"
            >
              FLASH
            </b-button>
            <b-collapse id="collapse-progress" class="mt-3">
              <b-card  class="mt-3">
                <p class="card-text" v-if="inProgress">
                  <b-spinner variant="success" label="Spinning" small></b-spinner>
                  Writing firmware into ASN board...
                </p>
                <p class="card-text" v-else>
                  Flashing is inactive.
                </p>
                <b-card-text>
                  <em v-for="message in this.progressMessages" :key="message.id">
                    {{ message.data | addStringNewLine }}<br/>
                  </em>
                </b-card-text>
              </b-card>
            </b-collapse>
          </b-form>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ipcRenderer } from 'electron'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      inProgress: false
    }
  },
  mounted () {
    this.listenFlashingUpdate()
    this.listenFlashingComplete()
    this.listenBinFileUnzip()
  },
  computed: {
    ...mapGetters([
      'serialPort',
      'initialOTADataFile',
      'bootLoaderFile',
      'appFile',
      'partitionsTableFile',
      'progressMessages',
      'connectedDevices',
      'singleFirmwareFile'
    ]),
    deviceOptions () {
      let options = [{ value: null, text: '--- Select AS board ---' }]
      options.push({ value: 'all', text: 'All connected boards' })
      this.connectedDevices.forEach((device) => {
        options.push({ value: device.comName, text: device.comName + ' - ' + device.manufacturer })
      })
      return options
    },
    isReadyFlashing () {
      return !this.isEmptyString(this.bootLoaderFile) &&
        !this.isEmptyString(this.initialOTADataFile) &&
        !this.isEmptyString(this.partitionsTableFile) &&
        !this.isEmptyString(this.appFile)
    },
    selectedSerialPort: {
      get () {
        return this.serialPort
      },
      set (value) {
        this.updateSerialPort(value)
      }
    },
    selectedSingleFirmwareFile: {
      get () {
        return this.singleFirmwareFile
      },
      set (file) {
        this.updateSingleFirmwareFile(file.path)
      }
    }
  },
  methods: {
    ...mapActions([
      'updateSerialPort',
      'updateOTADataFile',
      'updateBootLoaderFile',
      'updateAppFile',
      'updatePartitionsTableFile',
      'updateProgress',
      'clearProgressMessages',
      'updateSingleFirmwareFile'
    ]),
    onFlashingSubmit () {
      this.inProgress = true
      ipcRenderer.send('spi-flash-image', this.serialPort, this.initialOTADataFile,
        this.bootLoaderFile, this.appFile, this.partitionsTableFile)
    },
    listenFlashingUpdate () {
      this.clearProgressMessages()

      ipcRenderer.on('flashing-progress-updated', (event, message) => {
        if (message) {
          // console.log('Flashing progress:', message)
          // Add progress message into the list
          this.updateProgress(message)
        }
      })
    },
    listenFlashingComplete () {
      ipcRenderer.on('flashing-progress-completed', (event, code) => {
        if (code === 0) {
          this.updateProgress('Flashing done.')
        } else {
          this.updateProgress('Flashing failed.')
        }
        this.inProgress = false
      })
    },
    listenBinFileUnzip () {
      ipcRenderer.on('bin-file-unzipped', (event, order, dest) => {
        switch (order) {
          case 0:
            this.updateBootLoaderFile(dest)
            break
          case 1:
            this.updateOTADataFile(dest)
            break
          case 2:
            this.updatePartitionsTableFile(dest)
            break
          case 3:
            this.updateAppFile(dest)
            break
          default:
            break
        }
      })
    },
    isEmptyString (value) {
      return (typeof value === 'string' && !value.trim()) ||
        typeof value === 'undefined' ||
        value === null
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;
    padding-top: 80px;
    padding-bottom: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: padding .25s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 991px) {
      align-items: flex-start;
      padding-top: 80px;
    }
    .devices__select {
      min-width: 250px;
      display: flex;
      flex-flow: column;
    }
  }
</style>
