<template>
  <div class="settings">
    <div class="container">
      <div class="setting__group">
        <h1 class="about__name">
          Settings
        </h1>
        <div class="about__content">
          <div class="about_setting">
            <span>Chip</span>
            <b-form-select
              id="inputChip"
              v-model="supportedChip"
              :options="chipOptions"
            />
            <span class="pt-2">Mode</span>
            <b-form-select
              id="inputMode"
              v-model="supportedFlashMode"
              :options="modeOptions"
            />
            <span class="pt-2">Freq</span>
            <b-form-select
              id="inputFreq"
              v-model="supportedFlashFreq"
              :options="freqOptions"
            />
            <span class="pt-2">Size</span>
            <b-form-select
              id="inputSize"
              v-model="supportedFlashSize"
              :options="sizeOptions"
            />
            <span class="pt-2">Baud rate</span>
            <b-form-select
              id="inputBaudRate"
              v-model="supportedBaudRate"
              :options="baudRateOptions"
            />
          </div>
        </div>
      </div>
      <div class="about__group mt-5">
        <h1 class="about__name">
          {{ $t("contact_title") }}
        </h1>
        <div class="about__content">
          <ul class="about__list list-unstyled">
            <li>
              {{ $t("contact_headquater_address") }}
            </li>
            <li>
              {{ $t("contact_email") }}
            </li>
            <li>
              <a
                href="#"
                @click="openExternalLink('https://github.com/hanhdt/esp32-flash-tool')"
              >
                {{ $t("contact_document") }}
              </a>
            </li>
          </ul>
          <ul class="about__social list-unstyled">
            <li>
              <a @click="openExternalLink('https://hanhdt.github.io')">
                <img :src="websiteImageUrl" alt="hanhdt-website">
              </a>
            </li>
            <li>
              <a @click="openExternalLink('https://github.com/hanhdt')">
                <img :src="githubImageUrl" alt="hanhdt-github">
              </a>
            </li>
            <li>
              <a @click="openExternalLink('https://www.linkedin.com/in/hanh-d-tran-se/')">
                <img :src="linkedinImageUrl" alt="hanhdt-linkedin">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remote, shell } from 'electron'
import path from 'path'
import fs from 'fs'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Setting',
  data () {
    return {
      chipOptions: [
        { value: 'esp32', text: 'ESP32' },
        { value: 'esp8886', text: 'ESP8886' }
      ],
      modeOptions: [
        { value: 'dio', text: 'DIO' },
        { value: 'qio', text: 'QIO' },
        { value: 'dout', text: 'DOUT' },
        { value: 'qout', text: 'QOUT' },
        { value: 'keep', text: 'KEEP' }
      ],
      freqOptions: [
        { value: 'keep', text: 'KEEP' },
        { value: '20m', text: '20M' },
        { value: '26m', text: '26M' },
        { value: '40m', text: '40M' },
        { value: '80m', text: '80M' }
      ],
      sizeOptions: [
        { value: '256KB', text: '256KB' },
        { value: '512KB', text: '512KB' },
        { value: '1MB', text: '1MB' },
        { value: '2MB', text: '2MB' },
        { value: '4MB', text: '4MB' },
        { value: '8MB', text: '8MB' },
        { value: '16MB', text: '16MB' }
      ],
      baudRateOptions: [
        { value: 115200, text: '115200(bps)' },
        { value: 230400, text: '230400(bps)' },
        { value: 460800, text: '460800(bps)' },
        { value: 921600, text: '921600(bps)' },
        { value: 1500000, text: '1500000(bps)' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'chip',
      'flashMode',
      'flashFreq',
      'flashSize',
      'baudRate'
    ]),
    supportedBaudRate: {
      get () {
        return this.baudRate
      },
      set (newBaudRate) {
        this.updateBaudRate(newBaudRate)
      }
    },
    supportedFlashSize: {
      get () {
        return this.flashSize
      },
      set (newFlashSize) {
        this.updateFlashSize(newFlashSize)
      }
    },
    supportedFlashFreq: {
      get () {
        return this.flashFreq
      },
      set (newFlashFreq) {
        this.updateFlashFreq(newFlashFreq)
      }
    },
    supportedFlashMode: {
      get () {
        return this.flashMode
      },
      set (newFlashMode) {
        this.updateFlashMode(newFlashMode)
      }
    },
    supportedChip: {
      get () {
        return this.chip
      },
      set (newChip) {
        this.updateChip(newChip)
      }
    },
    websiteImageUrl () {
      const imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'globe-solid.svg')
      const base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    },
    githubImageUrl () {
      const imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'github-brands.svg')
      const base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    },
    linkedinImageUrl () {
      const imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'linkedin-brands.svg')
      const base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    }
  },
  methods: {
    ...mapActions([
      'updateChip',
      'updateFlashMode',
      'updateFlashFreq',
      'updateFlashSize',
      'updateBaudRate'
    ]),
    openExternalLink (link) {
      shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  align-items: flex-start;
  transition: padding .25s;
  font-size: 18px;
  font-weight: 400;
  @media (max-width: 991px) {
    align-items: flex-start;
    padding-top: 100px;
  }
  .settings__group {
    margin-bottom: 15px;
  }
  .about__group {
    padding-top: 20px;
    margin-bottom: 30px;
    border-top: #ddd 1px solid;
  }
  .about__name {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: normal;
  }
  .about__list {
    li {
      margin-bottom: 7px;
      font-size: 15px;
    }
  }
  .about__social {
    li {
      display: inline-block;
      width: 15px;
      margin-right: 15px;
      a {
        display: block;
        cursor: pointer;
      }
    }
  }
}

.light-theme {
  .about__list {
    li {
      color: #333;
    }
  }
}

.dark-theme {
  .about__list {
    li {
      color: #ccc;
    }
  }
  .about__social {
    li {
      a {
        img {
          filter: invert(100%);
        }
      }
    }
  }
}
</style>