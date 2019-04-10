<template>
  <div class="home">
    <div class="container">
      <b-card
        class="mb-2"
        bg-variant="light"
        header="Aroma Shooter Firmware Tool"
      >
        <b-card-body>
          <b-form>
            <b-form-group
              label="Serial port:"
              label-for="serialPortInput"
            >
              <b-form-input
                id="serialPortInput"
                v-model="selectedSerialPort"
              />
            </b-form-group>
            <b-form-group
              label="OTA:"
            >
              <b-form-file
                id="initialOTADataBinPathInput"
                v-model="selectedInitialOTAFile"
                :state="Boolean(selectedInitialOTAFile)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                accept=".bin"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              label="Bootloader:"
            >
              <b-form-file
                v-model="selectedBootLoaderFile"
                :state="Boolean(selectedBootLoaderFile)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                accept="application/octet-stream"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              label="Partitions table:"
            >
              <b-form-file
                v-model="selectedPartitionsTableFile"
                :state="Boolean(selectedPartitionsTableFile)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                accept="application/octet-stream"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              label="App:"
            >
              <b-form-file
                v-model="selectedAppFile"
                :state="Boolean(selectedAppFile)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                accept="application/octet-stream"
              ></b-form-file>
            </b-form-group>

            <b-button
              v-b-toggle.collapse-progress
              @click.prevent="onFlashingSubmit"
              variant="success"
              :disabled="inProgress"
            >
              Flash!
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
  },
  computed: {
    ...mapGetters([
      'serialPort',
      'initialOTADataFile',
      'bootLoaderFile',
      'appFile',
      'partitionsTableFile',
      'progressMessages'
    ]),
    selectedSerialPort: {
      get () {
        return this.serialPort
      },
      set (value) {
        this.updateSerialPort(value)
      }
    },
    selectedInitialOTAFile: {
      get () {
        return this.initialOTADataFile
      },
      set (file) {
        this.updateOTADataFile(file.path)
      }
    },
    selectedBootLoaderFile: {
      get () {
        return this.bootLoaderFile
      },
      set (file) {
        this.updateBootLoaderFile(file.path)
      }
    },
    selectedAppFile: {
      get () {
        return this.appFile
      },
      set (file) {
        this.updateAppFile(file.path)
      }
    },
    selectedPartitionsTableFile: {
      get () {
        return this.partitionsTableFile
      },
      set (file) {
        this.updatePartitionsTableFile(file.path)
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
      'clearProgressMessages'
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
  }
</style>
