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
      <v-select
        :items="tags"
        label="Tag(s)"
        v-model="image.tags"
        :disabled="isLoading"
        multiple
        chips
      ></v-select>
      <v-select
        :items="markers"
        label="Marker"
        v-model="image.marker"
        :disabled="isLoading"
      ></v-select>
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
import ImageUploader from '@/components/image-uploader/ImageUploader'
import storageService from '@/services/blockstack-storage'
const cryptoAddress = localStorage['blockstack-gaia-hub-config'] ? JSON.parse(localStorage['blockstack-gaia-hub-config']).address : ''

export default {

  data: () => ({
    blockstack: window.blockstack,
    isLoading: false,
    valid: false,
    imageFile: null,
    markers: [],
    tags: [],
    image: {
      title: '',
      detail: '',
      address: '',
      tags: null,
      marker: null,
      symbol: null,
      image: null,
      limit: false,
      archived: false,
      v: '0.0.1',
      id: ''
    },
    symbols: ['BTC', 'STX'],
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
                } }) : this.clear()
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
          this.image[property] = this.imageProp[property] instanceof Object ? { ...this.imageProp[property] } : this.imageProp[property]
        }
      } else {
        this.clear()
      }
    },
    fetchMarkers () {
      // fetching markers list
      this.blockstack.getFile('my_markers.json')
        .then((markersJSON) => {
          let markersObj = JSON.parse(markersJSON)
          if (markersObj) {
            this.markers = Object.keys(markersObj).map((key) => {
              return markersObj[key]
            })
          }
          this.blockstack.getFile('my_fav_markers.json')
            .then((favMarkersJSON) => {
              let favMarkersObj = JSON.parse(favMarkersJSON)
              if (favMarkersObj) {
                Object.keys(favMarkersObj).forEach((key) => {
                  if (key.split('_')[2] !== cryptoAddress) {
                    this.markers.push(favMarkersObj[key])
                  }
                })
              }
            })
        })
    },
    fetchTags () {
      // fetching tags list
      this.blockstack.getFile('my_tags.json')
        .then((tagsJSON) => {
          let tagsObj = JSON.parse(tagsJSON)
          if (tagsObj) {
            this.tags = Object.keys(tagsObj).map((key) => {
              return tagsObj[key]
            })
          }
          this.blockstack.getFile('my_fav_tags.json')
            .then((favTagsJSON) => {
              let favTagsObj = JSON.parse(favTagsJSON)
              if (favTagsJSON) {
                Object.keys(favTagsObj).forEach((key) => {
                  if (key.split('_')[2] !== cryptoAddress) {
                    this.tags.push(favTagsObj[key])
                  }
                })
              }
            })
        })
    }
  },
  mounted () {
    this.updateFromImageProp()
    this.fetchMarkers()
    this.fetchTags()
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
