<template>
  <!-- FOOTER -->
  <footer class="footer-site fixed-bottom">
    <div class="copy-right text-center">
      © 2019 Developed with ❤️ by Hanh DT
      <span>{{ appVersion }}</span>
    </div>
  </footer>
</template>

<script>
import { remote } from 'electron'

export default {
  name: 'AppFooter',
  computed: {
    appVersion () {
      return process.env.npm_package_version || remote.app.getVersion()
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
    span {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-color: $color-button-text;
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