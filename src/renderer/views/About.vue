<template>
  <div class="about">
    <div class="container">
      <div class="about__group">
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

export default {
  name: 'About',
  computed: {
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
  transition: padding .25s;
  font-size: 18px;
  font-weight: 400;
  @media (max-width: 991px) {
    align-items: flex-start;
    padding-top: 100px;
  }
  .about__group {
    margin-bottom: 30px;
    text-align: center;
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