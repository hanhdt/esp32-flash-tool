<template>
  <div class="about">
    <div class="container">
      <div class="about__group">
        <h1 class="about__name">
          {{ $t("contact_title") }}
        </h1>
        <div class="about__content">
          <ul class="about__list list-unstyled">
            <li>{{ $t("contact_headquater_address") }} </li>
            <li><a href="mailto:contact@aromajoin.com">{{ $t("contact_email") }}</a></li>
            <li>{{ $t("contact_tel") }}</li>
          </ul>
          <ul class="about__social list-unstyled">
            <li>
              <a @click="openExternalLink('https://aromajoin.com')">
                <img :src="websiteImageUrl" alt="aromajoin-website">
              </a>
            </li>
            <li>
              <a @click="openExternalLink('https://www.facebook.com/aromajoin')">
                <img :src="facebookImageUrl" alt="facebook">
              </a>
            </li>
            <li>
              <a @click="openExternalLink('https://twitter.com/aromajoin')">
                <img :src="twitterImageUrl" alt="twitter">
              </a>
            </li>
            <li>
              <a @click="openExternalLink('https://www.instagram.com/aromashooter')">
                <img :src="instagramImageUrl" alt="instagram">
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

export default {
  name: 'Setting',
  computed: {
    websiteImageUrl () {
      let imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'globe-solid.svg')
      let base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    },
    facebookImageUrl () {
      let imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'facebook-brands.svg')
      let base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    },
    twitterImageUrl () {
      let imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'twitter-brands.svg')
      let base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    },
    instagramImageUrl () {
      let imgPath = path.join(remote.app.getPath('userData'), '/images/',
        'instagram-brands.svg')
      let base64Image = fs.readFileSync(imgPath, 'base64')
      return `data:image/svg+xml;base64,${base64Image}`
    }
  },
  methods: {
    openExternalLink (link) {
      shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: padding .25s;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 991px) {
    align-items: flex-start;
    padding-top: 100px;
  }
  .about__group {
    margin-bottom: 30px;
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