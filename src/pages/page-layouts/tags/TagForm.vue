<template>
    <div class="container">
        <v-form ref="form" v-model="valid" lazy-validation>
            <image-uploader
                accept="image/*"
                ref="imageInput"
                :disabled="isLoading"
                limit=2000000
                :value="tag.image"
                @input="getUploadedImage"
            />

            <v-text-field
                v-model="tag.title"
                :rules="titleRules"
                :counter="10"
                :disabled="isLoading"
                label="Title"
                required
            ></v-text-field>
            <v-text-field
                v-model="tag.detail"
                label="Detail"
            ></v-text-field>
            <v-select
                :items="symbols"
                label="Symbol"
                v-model="tag.symbol"
                :disabled="isLoading"
            ></v-select>
            <v-text-field
                v-model="tag.address"
                :rules="addressRules"
                :counter="42"
                label="Address"
                :disabled="isLoading"
            ></v-text-field>
            <div>
                <div class="input-group--text-field primary--text">Privacy</div>
                <div class="switch-block">
                    <span class="switch-text">Public</span>
                    <v-switch v-model="tag.private"></v-switch>
                    <span class="switch-text">Private</span>
                </div>
            </div>
            <div v-if="tagProp">
                <div class="input-group--text-field primary--text">Archived</div>
                <div class="switch-block">
                    <span class="switch-text">No</span>
                    <v-switch v-model="tag.archived"></v-switch>
                    <span class="switch-text">Yes</span>
                </div>
            </div>
            <v-btn
                :disabled="!valid || isLoading || !tag.image"
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
    </div>
</template>

<script>
import ImageUploader from '../../../components/image-uploader/ImageUploader'
import blockstackStorage from '../../../services/blockstackStorage.js'

export default {
  data: () => ({
    blockstack: window.blockstack,
    isLoading: false,
    valid: false,
    tag: {
      coordinates: {
        lat: null,
        lng: null
      },
      title: '',
      address: '',
      detail: '',
      symbol: null,
      image: {
        url: null
      },
      private: false,
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
    tagProp: {
      type: [Object, null],
      default: null
    }
  },
  watch: {
    tagProp () {
      if (this.tagProp) {
        for (let property in this.tagProp) {
          this.tag[property] = this.tagProp[property]
        }
      } else {
        this.clear()
      }
    }
  },
  methods: {
    submit () {
      const timestamp = +new Date()
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.tag.createdtime = timestamp
        if (this.tag.image.name) {
          this.blockstack.putFile(`image_${timestamp}.${this.tag.image.name.split('.').pop()}`, this.tag.image)
            .then((imageUrl) => {
              if (!this.tag.image.url) {
                this.tag.image = {
                  url: imageUrl
                }
              }
              this.saveTag(timestamp)
            })
        } else {
          this.saveTag(timestamp)
        }
      }
    },
    getTagFilename (timestamp) {
      return this.tagProp ? `tag_${this.tagProp.createdtime}.json` : `tag_${timestamp}.json`
    },
    saveTag (timestamp) {
      this.blockstack.putFile(this.getTagFilename(timestamp), JSON.stringify(this.tag))
        .then((jsonUrl) => {
          blockstackStorage.updateTagIndex(jsonUrl.split('/').pop().split('.')[0], this.tag.title)
            .then(() => {
              this.isLoading = false
              if (!this.tagProp) this.clear()
            })
        })
    },
    clear () {
      this.$refs.form.reset()
      this.$refs.imageInput.removeFile()
    },
    getUploadedImage (e) {
      this.tag.image = e
    }
  },
  mounted () {
    if (this.tagProp) {
      for (let property in this.tagProp) {
        this.tag[property] = this.tagProp[property]
      }
    } else {
      this.clear()
    }
    const geoSuccess = (position) => {
      this.tag.coordinates.lat = position.coords.latitude
      this.tag.coordinates.lng = position.coords.longitude
    }
    navigator.geolocation.getCurrentPosition(geoSuccess)
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
</style>
