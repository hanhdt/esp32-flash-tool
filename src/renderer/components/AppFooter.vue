<template>
  <!-- FOOTER -->
  <footer class="footer-site fixed-bottom">
    <div class="container">
      <div class="copy-right text-center">
        © 2019 AROMAJOIN CORPORATION
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-site {
  padding: 10px 0;
}
.copy-right {
  font-size: 11px;
  letter-spacing: 1px;
  font-weight: 600;
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