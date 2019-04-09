<template>
  <div>
    <b-form-file
      v-model="fileData"
      :lang="$i18n.locale"
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
export default {
  name: 'BaseFile',
  props: {
    acceptFile: {
      type: String,
      require: false,
      default () {
        return '.bin'
      }
    },
    category: {
      type: String,
      required: true,
      default () {
        return 'files'
      }
    }
  },
  data () {
    return {
      fileData: null,
      fileState: true
    }
  },
  methods: {
    uploadFile (value) {
      if (value.size < (5 * 1024 * 1024)) { // ~< 5MB
        this.fileState = true
        this.saveBinaryFile(value)
      } else {
        this.fileState = false
      }
    },
    saveBinaryFile (file) {
      console.log('File:', file)
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
