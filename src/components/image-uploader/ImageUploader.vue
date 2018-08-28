<template>
    <div>
        <div>
            <img
                id="image"
                :src="imageUrl"
                ref="imageUrl"
                height="150"
                @click="onPickFile"
                style="cursor: pointer;"
            >
        </div>
        <div>
            <v-btn raised @click="onPickFile" :disabled="disabled" v-if="!imageUrl">
                {{ selectLabel }}
            </v-btn>
            <v-btn raised class="error" @click="removeFile" :disabled="disabled" v-else>
                {{ removeLabel }}
            </v-btn>
            <input
                type="file"
                ref="image"
                name="image"
                :accept="accept"
                @change="onFilePicked"
            >
        </div>
    </div>
</template>

<script>
  import imageCompressor from '../../services/imageCompressor'

  export default {
    props: {
      value: {
        type: String
      },
      accept: {
        type: String,
        default: '*'
      },
      selectLabel: {
        type: String,
        default: 'Select an image'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      removeLabel: {
        type: String,
        default: 'Remove'
      },
      limit: {
        type: [Number, String],
        default: null,
      },
    },

    data() {
      return {
        imageUrl: ''
      }
    },

    watch: {
      value(v) {
        this.imageUrl = v
      },
    },

    mounted() {
      this.imageUrl = this.value
    },

    methods: {
      onPickFile() {
        this.$refs.image.click()
      },

      onFilePicked(event) {
        const files = event.target.files || event.dataTransfer.files
        if (files && files[0]) {
          let filename = files[0].name

          if (filename && filename.lastIndexOf('.') <= 0) {
            return //return alert('Please add a valid image!')
          }

          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
            this.$refs.imageUrl.addEventListener('load', () => {
              console.log(this.$refs.imageUrl.src == fileReader.result)
              if (files[0].size < this.limit) {
                this.$emit('input', files[0])
              } else {
                console.log(files[0])
                imageCompressor.compress(files[0], this.$refs.imageUrl, 0.8, this.limit)
                  .then((newImage) => {
                    console.log(newImage)
                    this.$emit('input', newImage)
                  })
              }
            })
          })
          fileReader.readAsDataURL(files[0])

        }
      },

      removeFile() {
        this.imageUrl = ''
      }
    }
  }
</script>

<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>