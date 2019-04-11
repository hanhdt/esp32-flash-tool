<template>
  <div id="nav" class="aroma__nav">
    <b-link @click.prevent="handleRefreshApp">
      <i class="material-icons">
        cached
      </i>
    </b-link>
    <router-link
      to="/setting"
      :class="$route.name === 'setting' ? 'active' : ''">
      <img :src="settingImageUrl" alt="">
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
      let imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'settings.svg')
      let base64Image = fs.readFileSync(imgPath, 'base64')
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
  background: #333;
  display: flex;
  justify-content: flex-end;
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
      margin-right: 10px;
    }
  }
}
.light-theme {
  .aroma__nav {
    background: #F0F4F8;
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
    background: #333;
     a {
      color: #fff;
      img {
        filter: invert(100%);
      }
    }
  }
}
</style>