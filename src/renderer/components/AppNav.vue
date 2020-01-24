<template>
  <div id="nav" class="aroma__nav">
    <!-- Refresh boards -->
    <b-link 
      @click.prevent="handleRefreshApp"
    >
      <i class="material-icons">
        cached
      </i>
    </b-link>

    <!-- Setting -->
    <router-link
      v-if="$route.name !== 'setting'"
      to="/setting"
      :class="$route.name === 'setting' ? 'active' : ''"
    >
      <img :src="settingImageUrl" alt="">
    </router-link>
    <router-link
      v-else
      to="/"
    >
      <i class="material-icons">
        keyboard_arrow_left
      </i>
    </router-link>
  </div>
</template>

<script>
import { ipcRenderer, remote } from 'electron'
import path from 'path'
import fs from 'fs'

export default {
  name: 'AppNav',
  computed: {
    settingImageUrl () {
      const imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'settings.svg')
      const base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    }
  },
  methods: {
    handleRefreshApp () {
      ipcRenderer.send('reload-app')
    }
  }
}
</script>

<style lang="scss" scoped>
.aroma__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 10px;
  .devices__select {
    min-width: 250px;
    display: flex;
    flex-flow: column;
  }
  a {
    padding: 10px 15px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
      text-decoration: none;
    }
    img {
      width: 25px;
    }
  }
}
.light-theme {
  .aroma__nav {
    a {
      color: #333;
      &:after {
        background-color: #ccc;
      }
    }
  }
}
.dark-theme {
  .aroma__nav {
     a {
      color: #fff;
      img {
        filter: invert(100%);
      }
    }
  }
}
</style>