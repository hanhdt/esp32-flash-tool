<template>
  <div :class="layoutClass">
    <AppHeader/>
    <div class="content-site">
      <slot name="body"/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter
  },
  props: {
    layoutClass: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-site {
  min-height: 100%;
}
</style>
