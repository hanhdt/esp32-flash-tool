<template>
  <div class="home">
    <div class="container">
      <b-card
        title="Aroma Shooter Firmware Tool"
        class="mb-2"
      >
        <b-card-body>
          <b-form @submit.prevent="onFlashingSubmit">
            <b-form-group
              label="Serial port:"
              label-for="serialPortInput"
            >
              <b-form-input
                id="serialPortInput"
                v-model="serialPort"
              />
            </b-form-group>
            <b-form-group
              label="OTA:"
              label-for="initialOTADataBinPathInput"
            >
              <b-form-input
                id="initialOTADataBinPathInput"
                v-model="initialOTADataBinPath"
              />
            </b-form-group>
            <b-form-group
              label="Bootloader:"
              label-for="bootloaderBinPathInput"
            >
              <b-form-input
                id="bootloaderBinPathInput"
                v-model="bootloaderBinPath"
              />
            </b-form-group>
            <b-form-group
              label="App:"
              label-for="appBinPathInput"
            >
              <b-form-input
                id="appBinPathInput"
                v-model="appBinPath"
              />
            </b-form-group>
            <b-form-group
              label="Partitions table:"
              label-for="partitionsBinPathInput"
            >
              <b-form-input
                id="partitionsBinPathInput"
                v-model="partitionsBinPath"
              />
            </b-form-group>

            <b-button type="submit" variant="primary">Run flash</b-button>
            <b-button v-b-toggle.collapse-details variant="info">Details</b-button>

            <b-collapse id="collapse-details" class="mt-3">
              <b-card>
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

export default {
  name: 'home',
  data () {
    return {
      serialPort: '/dev/ttyUSB0',
      initialOTADataBinPath: '/home/hanh/esp/workspace/espidf-asn-controller/build/ota_data_initial.bin',
      bootloaderBinPath: '/home/hanh/esp/workspace/espidf-asn-controller/build/bootloader/bootloader.bin',
      appBinPath: '/home/hanh/esp/workspace/espidf-asn-controller/build/asn2.bin',
      partitionsBinPath: '/home/hanh/esp/workspace/espidf-asn-controller/build/partitions.ota.bin',
      progressMessages: [],
      inProgress: false
    }
  },
  created () {
    this.listenFlashingUpdate()
    this.listenFlashingComplete()
  },
  methods: {
    onFlashingSubmit () {
      this.inProgress = true
      ipcRenderer.send('spi-flash-image', this.serialPort, this.initialOTADataBinPath,
        this.bootloaderBinPath, this.appBinPath, this.partitionsBinPath)
    },
    listenFlashingUpdate () {
      ipcRenderer.on('flashing-progress-updated', (event, message) => {
        if (message) {
          // console.log('Flashing progress:', message)
          // Add progress message into the list
          this.progressMessages.push({ id: Date.now(), data: message })
        }
      })
    },
    listenFlashingComplete () {
      ipcRenderer.on('flashing-progress-completed', (event, code) => {
        if (code === 0) {
          console.log('Flashing success.')
          this.progressMessages.push({ id: Date.now(), data: 'Flashing done.' })
        } else {
          console.log('Flashing failed.')
          this.progressMessages.push({ id: Date.now(), data: 'Flashing failed.' })
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
