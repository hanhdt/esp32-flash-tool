<template>
  <div>
    <b-form-file
      v-model="fileData"
      :lang="$i18n.locale"
      :placeholder="$t('cartridge_image_upload')"
      :state="fileState"
      :accept="acceptFile"
      aria-describedby="fileFeedback">
    </b-form-file>
    <b-form-invalid-feedback
      id="fileFeedback"
      :class="fileState ? 'valid__feedback' : 'invalid__feedback'">
      {{ $t("pref_file_validate") }}
    </b-form-invalid-feedback>
  </div>
</template>

<script>
import { ipcRenderer, remote } from 'electron'
import { mapActions, mapGetters } from 'vuex'
import path from 'path'

export default {
  name: 'BaseFile',
  props: {
    acceptFile: {
      type: String,
      require: false,
      default () {
        return 'image/jpeg, image/png, image/gif'
      }
    },
    category: {
      type: String,
      required: true,
      default () {
        return 'background'
      }
    },
    cartridgeId: {
      type: Number,
      required: false,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      fileData: null,
      fileState: true
    }
  },
  computed: {
    ...mapGetters(['cartridges'])
  },
  methods: {
    ...mapActions([
      'updateBackgroundImage',
      'updateCartridges'
    ]),
    uploadFile (value) {
      if (value.size < (5 * 1024 * 1024)) { // ~< 5MB
        this.fileState = true
        switch (this.category) {
          case 'background':
            this.saveBackgroundFile(value)
            break
          case 'cartridge':
            this.saveCartridgeFile(value)
            break
          default:
            break
        }
      } else {
        this.fileState = false
      }
    },
    saveBackgroundFile (file) {
      ipcRenderer.send('save-background', {
        name: file.name,
        path: file.path,
        size: file.size,
        uploadDir: remote.app.getPath('userData')
      })
      this.updateBackgroundImage(file.name)
    },
    saveCartridgeFile (file) {
      ipcRenderer.send('save-cartridge-image', {
        name: file.name,
        path: file.path,
        size: file.size,
        uploadDir: path.join(remote.app.getPath('userData'), '/cartridge-uploads/')
      })
      setTimeout(() => {
        this.cartridges[Number(this.cartridgeId) - 1].img = file.name
        this.cartridges[Number(this.cartridgeId) - 1].isCustomized = true
        this.updateCartridges(this.cartridges)
      }, 700)
    }
  },
  watch: {
    fileData: {
      handler: 'uploadFile'
    }
  }
}
</script>

<style lang="scss" scoped>
.valid__feedback {
  display: none;
}
.invalid__feedback {
  display: inline-block;
}
</style>
