<template>
    <v-card class="container">
        <v-form ref="form" v-model="valid" lazy-validation>
            <image-uploader
                accept="image/*"
                ref="imageInput"
                :disabled="isLoading"
                limit=2000000
                :value="imageFile"
                @input="getUploadedImage"
            />

            <v-text-field
                v-model="image.title"
                :rules="titleRules"
                :counter="10"
                :disabled="isLoading"
                label="Title"
                required
            ></v-text-field>
            <v-text-field
                v-model="image.detail"
                label="Detail"
                :disabled="isLoading"
            ></v-text-field>
            <v-select
                :items="symbols"
                label="Symbol"
                v-model="image.symbol"
                :disabled="isLoading"
            ></v-select>
            <v-text-field
                v-model="image.address"
                :rules="addressRules"
                :counter="42"
                label="Address"
                :disabled="isLoading"
            ></v-text-field>
            <div class="switch-wrapper">
                <div class="input-group--text-field primary--text">Privacy</div>
                <div class="switch-block">
                    <span class="switch-text">Public</span>
                    <v-switch v-model="image.limit"></v-switch>
                    <span class="switch-text">Personal</span>
                </div>
            </div>
            <div class="switch-wrapper" v-if="imageProp">
                <div class="input-group--text-field primary--text">Archived</div>
                <div class="switch-block">
                    <span class="switch-text">No</span>
                    <v-switch v-model="image.archived"></v-switch>
                    <span class="switch-text">Yes</span>
                </div>
            </div>
            <v-btn
                :disabled="!valid || isLoading || !imageFile"
                @click="submit"
            >
                submit
            </v-btn>
            <v-btn
                @click="clear"
                :disabled="isLoading"
            >
                clear
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import ImageUploader from '../../../components/image-uploader/ImageUploader'
import storageService from '../../../services/blockstack-storage'

export default {
  data: () => ({
    blockstack: window.blockstack,
    isLoading: false,
    valid: false,
    imageFile: null,
    image: {
      title: '',
      detail: '',
      address: '',
      symbol: null,
      image: null,
      limit: false,
      archived: false,
      v: '0.0.1',
      id: ''
    },
    symbols: ['BTC', 'ETH', 'LTC'],
    titleRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      v => /^\w+$/.test(v) || 'Letters, numbers and "_" are only allowed'
    ],
    addressRules: [
      v => v ? /^((?!_)[A-z0-9])+$/.test(v) || 'Letters and numbers are only allowed' : true,
      v => v ? v.length <= 42 || 'Please enter proper address' : true
    ]
  }),
  components: {
    ImageUploader
  },
  props: {
    imageProp: {
      type: [Object, null],
      default: null
    }
  },
  watch: {
    imageProp () {
      this.updateFromImageProp()
    }
  },
  methods: {
    submit () {
      const timestamp = +new Date()
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.image.createdtime = this.imageProp ? this.imageProp.createdtime : timestamp
        this.image.owner = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
        if (this.imageFile.name) {
          this.blockstack.putFile(`image_${timestamp}.${this.imageFile.name.split('.').pop()}`, this.imageFile)
            .then((imageUrl) => {
              // if (!this.imageFile) {
              this.image.image = imageUrl
              // }
              this.saveImage(timestamp)
            })
        } else {
          this.saveImage(timestamp)
        }
      }
    },
    getImageFilename (timestamp) {
      return this.imageProp ? `image_${this.imageProp.createdtime}.json` : `image_${timestamp}.json`
    },
    saveImage (timestamp) {
      this.blockstack.putFile(this.getImageFilename(timestamp), JSON.stringify(this.image))
        .then((jsonUrl) => {
          storageService.updateImageIndex(jsonUrl.split('/').pop().split('.')[0], this.image.title)
            .then(() => {
              this.isLoading = false
              this.imageProp ? this.$router.push({
                name: 'ImageInfo',
                params: {
                  imageName: 'image_' + this.image.createdtime,
                  imageObject: this.image
                }}) : this.clear()
            })
        })
    },
    clear () {
      this.$refs.form.reset()
      this.$refs.imageInput.removeFile()
    },
    getUploadedImage (e) {
      this.imageFile = e
    },
    updateFromImageProp () {
      if (this.imageProp) {
        for (let property in this.imageProp) {
          this.image[property] = this.imageProp[property] instanceof Object ? {...this.imageProp[property]} : this.imageProp[property]
        }
      } else {
        this.clear()
      }
    }
  },
  mounted () {
    this.updateFromImageProp()
  }
}
</script>

<style lang="scss">
    .switch-block {
        display: flex;
        height: 30px;
        margin-bottom: 20px;
        align-items: center;
        .switch-text {
            font-size: 16px;
        }
        .input-group {
            flex: 0;
            margin: auto 10px;

            .input-group__details {
                display: none;
            }
        }
    }
    .geo-button-wrapper {
        display: flex;
        align-items: center;
        margin-left: -8px;
        padding-bottom: 10px;
    }
</style>
