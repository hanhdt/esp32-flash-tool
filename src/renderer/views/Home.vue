<template>
  <div class="home">
    <div class="container">
      <img
        :src="appLogoUrl"
        class="background"
      />
      <b-card
        class="mb-2"
        bg-variant="none"
        border-variant="none"
      >
        <b-form>
          <!-- Select compressed firmware image -->
          <b-form-group
            label="Firmware file"
            class="mb-3"
          >
            <div class="fwimage__select">
              <b-form-file
                v-model="selectedSingleFirmwareFile"
                :state="Boolean(selectedSingleFirmwareFile)"
                placeholder="Choose a compressed .zip file"
                drop-placeholder="Drop zipped file here..."
                accept="application/zip, application/x-tar, application/x-7z-compressed,
                  application/x-bzip, application/x-bzip2, application/x-rar-compressed"
              ></b-form-file>
            </div>       
          </b-form-group>

          <!-- Select ESP32 board -->
          <b-form-group
            label="ESP32 board"
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

          <!-- Flash! -->
          <div class="mt-4 d-flex justify-content-end">
            <b-button
              v-b-toggle.collapse-progress
              v-b-tooltip.hover
              title="FLASH!"
              variant="success"
              size="sm"
              @click.prevent="onFlashingSubmit"
              :disabled="inProgress || !isReadyFlashing"
            >
              <i class="material-icons">flash_on</i>
            </b-button>
          </div>

          <!-- Progress details -->
          <b-collapse
            id="collapse-progress"
            class="mt-3"
          >
            <b-card
              class="mt-3"
              bg-variant="dark"
            >
              <p 
                class="card-text"
                v-if="inProgress && flashingStatus === 0"
              >
                <b-spinner
                  variant="success"
                  label="Spinning"
                  small>
                </b-spinner>
                Writing firmware into the board...
              </p>
              <p
                class="card-text"
                v-else-if="!inProgress && flashingStatus === 1"
              >
                <i class="material-icons">
                  flash_off
                </i>
                <strong>Flashing is not completed!</strong>
              </p>
              <p
                class="card-text"
                v-else
              > 
                <i class="material-icons">
                  check_circle
                </i>
                <strong>Flashing is finished!</strong>
              </p>
              <b-card-text>
                <em v-show="this.progressMessages.length > 1">
                  Details:
                </em>
                <br>
                <em 
                  v-for="message in this.progressMessages"
                  :key="message.id"
                >
                  {{ message.data | addStringNewLine }}<br/>
                </em>
              </b-card-text>
            </b-card>
          </b-collapse>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ipcRenderer, remote } from 'electron'
import { mapActions, mapGetters } from 'vuex'
import uuidv4 from 'uuid/v4'
import path from 'path'
import fs from 'fs'

export default {
  name: 'home',
  create () {
    this.listenFlashingUpdate()
    this.listenFlashingComplete()
    this.listenBinFileUnzip()
  },
  computed: {
    ...mapGetters([
      'inProgress',
      'serialPort',
      'bootLoaderFile',
      'bootLoaderOffset',
      'initialOTADataFile',
      'initialOTADataOffset',
      'partitionsTableFile',
      'partitionsTableOffset',
      'factorySerialFile',
      'factorySerialOffset',
      'appFile',
      'appOffset',
      'progressMessages',
      'connectedDevices',
      'singleFirmwareFile',
      'flashingStatus',
      'initialOTADataName',
      'bootLoaderName',
      'partitionsTableName',
      'factorySerialName',
      'appName',
      'isReadyFlashing'
    ]),
    appLogoUrl () {
      let imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'esp32-flash-tool.png')
      let base64Image = fs.readFileSync(imgPath, 'base64')

      return `data:image/png;base64,${base64Image}`
    },
    deviceOptions () {
      let options = [{ value: null, text: '--- Select ESP32 board ---' }]
      this.connectedDevices.forEach((device) => {
        options.push({ value: device.comName, text: device.comName + ' - ' + device.manufacturer })
      })
      return options
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
      'updateInProgress',
      'updateSerialPort',
      'updateBootLoaderFile',
      'updateBootLoaderName',
      'updateBootLoaderOffset',
      'updateOTADataFile',
      'updateOTADataName',
      'updateOTADataOffset',
      'updatePartitionsTableFile',
      'updatePartitionsTableName',
      'updatePartitionsTableOffset',
      'updateFactorySerialFile',
      'updateFactorySerialName',
      'updateFactorySerialOffset',
      'updateAppFile',
      'updateAppName',
      'updateAppOffset',
      'updateProgress',
      'clearProgressMessages',
      'updateSingleFirmwareFile',
      'updateFlashingStatus'
    ]),
    onFlashingSubmit () {
      try {
        this.updateInProgress(true)
        this.clearProgressMessages()
        ipcRenderer.send('spi-flash-image', {
          serialPort: this.serialPort,
          bootLoaderFile: this.bootLoaderFile,
          bootLoaderOffset: this.bootLoaderOffset,
          initialOTADataFile: this.initialOTADataFile,
          initialOTADataOffset: this.initialOTADataOffset,
          partitionsTableFile: this.partitionsTableFile,
          partitionsTableOffset: this.partitionsTableOffset,
          factorySerialFile: this.factorySerialFile,
          factorySerialOffset: this.factorySerialOffset,
          appFile: this.appFile,
          appOffset: this.appOffset
        })
      } catch (e) {
        console.error(e)
      }
    },
    listenFlashingUpdate () {
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
          this.updateProgress({id: uuidv4(), data: 'Flashing done.'})
        } else {
          this.updateProgress({id: uuidv4(), data: 'Flashing failed.'})
        }

        this.updateFlashingStatus(code)
        this.updateInProgress(false)
      })
    },
    listenBinFileUnzip () {
      ipcRenderer.on('bin-file-unzipped', (event, index, offset, filename, dest) => {
        switch (index) {
          case 1:
            this.updateBootLoaderName(filename)
            this.updateBootLoaderFile(dest)
            this.updateBootLoaderOffset(offset)
            break
          case 2:
            this.updateOTADataName(filename)
            this.updateOTADataFile(dest)
            this.updateOTADataOffset(offset)
            break
          case 3:
            this.updatePartitionsTableName(filename)
            this.updatePartitionsTableFile(dest)
            this.updatePartitionsTableOffset(offset)
            break
          case 4:
            this.updateFactorySerialName(filename)
            this.updateFactorySerialFile(dest)
            this.updateFactorySerialOffset(offset)
            break
          case 5:
            this.updateAppName(filename)
            this.updateAppFile(dest)
            this.updateAppOffset(offset)
            break
          default:
            break
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: padding .25s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    @media (max-width: 991px) {
      align-items: flex-start;
      padding-top: 50px;
    }
    .background {
      max-height: 110px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
    .fwimage__select, .devices__select {
      min-width: 250px;
      display: flex;
      flex-flow: column;
    }
    .card {
      background-color: transparent;
      border: none;
    }
    form {
      button {
        min-width: 92px;
      }
      .card-text {
        strong {
          vertical-align: super;
          padding-left: 5px;
        }
      }
    }
  }
</style>
