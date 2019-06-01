<template>
  <div id="esp-firmware-app">
    <AppLayout :layoutClass="theme">
      <template slot="body">
        <router-view />
      </template>
    </AppLayout>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions, mapGetters } from 'vuex'
import AppLayout from './components/AppLayout.vue'

export default {
  name: 'ESPFirmwareApp',
  components: {
    AppLayout
  },
  created () {
    this.restoreAppPerferences()
    this.listenScanningPorts()
  },
  mounted () {
    this.sendScanningPortsEvent()
  },
  computed: {
    ...mapGetters({
      theme: 'appTheme'
    })
  },
  methods: {
    ...mapActions([
      'updateAppTheme',
      'addConnectedDevice'
    ]),
    restoreAppPerferences () {
      if (localStorage.getItem('appTheme')) {
        this.updateAppTheme(localStorage.getItem('appTheme'))
      } else {
        localStorage.setItem('appTheme', this.theme)
      }
    },
    sendScanningPortsEvent () {
      ipcRenderer.send('scan-devices')
    },
    listenScanningPorts () {
      ipcRenderer.on('ports-scanned', (event, ports) => {
        // console.log('Connected devices:', ports)
        ports.forEach((device) => {
          this.addConnectedDevice(device)
        })
      })
    }
  }
}
</script>

<style lang="scss">
// Normalize default styles across browsers
@import '~normalize.css/normalize.css';
// Design variables and utilities from src/design.
@import '@/design/index.scss';
// Style Bootstrap.
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

// ===
// Global app styles
// ===
html {
  height: 100%;
}
body {
  min-width: 320px;
  min-height: 100%;
}

.light-theme {
  background-color: $light!important;
  color: $dark!important;
  min-height: 100%;
  position: relative;
  .form-control, .custom-select, .custom-file, .custom-file-label {
    color: #333!important;
    background-color: #fff!important;
  }
  .custom-file-label::after {
    background-color: #e9ecef!important;
    color: #495057!important;
    border-radius: 0!important;
  }
  .custom-file-input:lang(en)~.custom-file-label::after {
    content: "Browse";
  }
  .custom-file-input:lang(ja)~.custom-file-label::after {
    content: "設定する";
  }
  .modal-content {
    background-color: #fff!important;
  }
  .modal-header {
    border-bottom: 1px solid #e9ecef!important;
  }
  .modal-footer {
    border-top: 1px solid #e9ecef!important;
  }
  .btn-link {
    color: #333!important;
  }
}

.dark-theme {
  background-color: $dark!important;
  color: $light!important;
  min-height: 100%;
  position: relative;
  .form-control, .custom-select, .custom-file, .custom-file-label {
    color: #fff!important;
    background-color: #3B3B3B!important;
    border: 0!important;
  }
  .custom-select {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  }
  .custom-file-label::after {
    background-color: #555!important;
    color: #fff!important;
    border: 0!important;
    border-radius: 0!important;
  }
  .custom-file-input:lang(en)~.custom-file-label::after {
    content: "Browse";
  }
  .custom-file-input:lang(ja)~.custom-file-label::after {
    content: "設定する";
  }
  .modal-content {
    background-color: #444!important;
    .form-control, .custom-select, .custom-file, .custom-file-label {
      background-color: #333!important;
    }
  }
  .modal-header {
    border-bottom: 1px solid #555!important;
  }
  .modal-footer {
    border-top: 1px solid #555!important;
  }
  .close {
    color: #fff!important;
  }
  .btn-link {
    color: #fff!important;
  }
}
.form-control, .custom-select, .custom-file, .custom-file-label {
  height: 34px!important;
  font-size: 14px!important;
  border-radius: 0px!important;
}
.custom-file-label::after {
  height: auto!important;
}
.modal-dialog {
  min-width: 320px;
  margin-left: auto!important;
  margin-right: auto!important;
  @media (max-width: 768px) {
    max-width: 400px!important;
  }
}
</style>
