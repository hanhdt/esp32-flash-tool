<template>
  <!-- FOOTER -->
  <footer class="footer-site fixed-bottom">
    <div class="copy-right text-center">
      <span class="connect-status">
        {{ connectedStatus }}
      </span>
      {{ footerCopyright }}
      <span class="app-version">
        {{ appVersion }}
      </span>
    </div>
  </footer>
</template>

<script>
import { remote } from 'electron'
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  computed: {
    ...mapGetters(['connectedDevices']),
    appVersion () {
      return process.env.npm_package_version || remote.app.getVersion()
    },
    connectedStatus () {
      return this.connectedDevices.length > 0 ? 'Board connected' : 'n/a'
    },
    footerCopyright () {
      return `© ${new Date().getFullYear()} Developed by with ❤️ at AROMAJOIN`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/design/index.scss';

.footer-site {
  padding: 10px 0;
  .copy-right {
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: 600;
    color: $color-button-text;
    .connect-status {
      text-decoration-color: #F0F4F8;
      float: left;
      margin-left: 10px;
    }
    .app-version {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-color: #F0F4F8;
      float: right;
      margin-right: 10px;
    }
  }
  @extend %typography-small;
}

.light-theme {
  .footer-site {
    background: #F0F4F8;
  }
}
.dark-theme {
  .footer-site {
    background: #333;
  }
}
</style>