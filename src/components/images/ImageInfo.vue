<template>
  <v-card class="container">
    <v-list two-line>
      <v-list-tile>
        <template v-if="isLoading">
          <v-progress-linear
            indeterminate
            color="grey lighten-1"
            class="mb-0"
          ></v-progress-linear>
        </template>
        <template v-else>
          <v-divider/>
          <a v-if="isFavorite && !hubUrl" class="image-action" @click="removeFromFavorite">
            <v-icon color="grey lighten-1">favorite_border</v-icon>
            Remove from Favorite
          </a>
          <a v-if="!isFavorite && !hubUrl" class="image-action" @click="addToFavorite">
            <v-icon color="grey lighten-1">favorite</v-icon>
            Add to Favorite
          </a>
          <v-divider v-if="!hubUrl" class="divider-intermediate"/>
          <router-link v-if="!hubUrl" class="image-action" :to="{ name: 'EditImage', params: { imageProp: this.imageObject } }">
            <v-icon color="grey lighten-1">edit</v-icon>
            Edit
          </router-link>
        </template>
      </v-list-tile>
      <v-list-tile>
        <div class="json-address">
          <v-text-field
            ref="urlInput"
            :value="imageUrl"
            class="url-field"
            readonly
          />
          <v-btn class="button-copy" color="#20C3A5" @click="copyUrl">{{ copyButtonText }}</v-btn>
        </div>
      </v-list-tile>
      <v-list-tile v-if="imageObject.title">
        <v-list-tile-content>
          <v-list-tile-sub-title>Title</v-list-tile-sub-title>
          <v-list-tile-title v-html="imageObject.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="imageObject.tags && imageObject.tags.length">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ imageObject.tags.length>1 ? 'Tags' : 'Tag' }}</v-list-tile-sub-title>
          <div>
            <template v-for="tag in imageObject.tags">
              <v-chip :key="tag.address">{{ '#' + tag.title }}</v-chip>
            </template>
          </div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="imageObject.marker">
        <v-list-tile-content>
          <v-list-tile-sub-title>Marker</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <open-map-with-marker v-if="markerCenter" :center="markerCenter" readonly/>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Privacy</v-list-tile-sub-title>
          <v-list-tile-title v-html="imageObject.private ? 'Private' : 'Public'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Archived</v-list-tile-sub-title>
          <v-list-tile-title v-html="imageObject.archived ? 'Yes' : 'No'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="imageObject.detail">
        <v-list-tile-content>
          <v-list-tile-sub-title>Details</v-list-tile-sub-title>
          <v-list-tile-title v-html="imageObject.detail"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="imageObject.createdtime">
        <v-list-tile-content>
          <v-list-tile-sub-title>Created time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(imageObject.createdtime).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!--<v-list-tile v-if="imageObject.private">-->
      <!--<v-list-tile-content>-->
      <!--<v-list-tile-sub-title>Privacy</v-list-tile-sub-title>-->
      <!--<v-list-tile-title v-html="imageObject.private ? 'Private' : 'Public'"></v-list-tile-title>-->
      <!--</v-list-tile-content>-->
      <!--</v-list-tile>-->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Image</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <img v-if="imageObject.image" :src="imageObject.image" class="image-image">
      <v-list-tile v-if="imageObject.symbol">
        <v-list-tile-content>
          <v-list-tile-sub-title>Symbol</v-list-tile-sub-title>
          <v-list-tile-title v-html="imageObject.symbol"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="imageObject.address">
        <v-list-tile-content>
          <v-list-tile-sub-title>Address</v-list-tile-sub-title>
          <v-list-tile-title v-html="imageObject.address"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn color="teal accent-4" round dark @click="redirectUser(imageObject.address)">Donate</v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
import OpenMapWithMarker from '@/components/maps/OpenMapWithMarker'
import storageService from '@/services/blockstack-storage'

export default {
  name: 'ImageInfo',
  data: () => ({
    copyButtonText: 'Copy',
    isFavorite: false,
    isLoading: false,
    markerCenter: null
  }),
  props: {
    imageObject: {
      type: Object
    },
    hubUrl: {
      type: String
    }
  },
  components: {
    OpenMapWithMarker
  },
  computed: {
    imageUrl () {
      // parsing blockstack gaia hub cong from localhost for creating hub url
      let urlItems = {}
      if (localStorage['blockstack-gaia-hub-config']) {
        urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
      }
      // creating hub url(where our files are stored)
      const hubUrl = this.hubUrl || `${urlItems.url_prefix}${urlItems.address}/`
      return this.imageObject ? `${hubUrl}image_${this.imageObject.createdtime}.json` : ''
    }
  },
  methods: {
    redirectUser (address) {
      this.$store.state.BTCAddress = address
      this.$router.push({name: 'Send'})
    },
    getFavImageName () {
      const imageUrlArr = this.imageUrl.split('/')
      return `${imageUrlArr.pop().split('.')[0]}_${imageUrlArr.pop()}`
    },
    copyUrl (e) {
      this.$refs.urlInput.$refs.input.select()
      document.execCommand('copy')
      this.copyButtonText = 'Copied!'
      setTimeout(() => { this.copyButtonText = 'Copy' }, 2000)
    },
    addToFavorite () {
      this.isLoading = true
      storageService.updateFavoriteImageIndex(this.getFavImageName(), this.imageObject.title)
        .then(() => {
          this.isFavorite = true
          this.isLoading = false
        })
    },
    removeFromFavorite () {
      this.isLoading = true
      storageService.reduceFavoriteImageIndex(this.getFavImageName(), this.imageObject.title)
        .then(() => {
          this.isFavorite = false
          this.isLoading = false
        })
    }
  },
  mounted () {
    if (!this.hubUrl) {
      this.$store.commit('toggleLoading')
      storageService.getFile({ fileName: 'my_fav_images.json' })
        .then(res => {
          if (res) {
            this.isFavorite = !!res[this.getFavImageName()]
          }
        })
        .then(() => {
          if (this.imageObject.marker) {
            axios.get(this.imageObject.marker.address)
              .then(res => {
                if (res) {
                  this.markerCenter = res.data.coordinates
                }
                this.$store.commit('toggleLoading')
              })
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
    .divider-intermediate {
        flex: 0 15px;
    }
    .image-action {
        cursor: pointer;
        padding: 10px;
        display: flex;
        align-items: center;
        color: #1ebea5;
        &:not([href]) {
            color: #1ebea5;
        }
        .v-icon {
            font-size: 18px;
            padding-bottom: 2px;
            padding-right: 5px;
        }
        &:hover {
            .v-icon {
                color: rgba(0,0,0,0.87) !important;
            }
        }
    }
    .image-image {
        max-width: 100%;
    }
    .json-address {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        .button-copy {
            margin-top: 13px !important;
            background-color: #20C3A5 !important;
            color: white;
            position: relative;
        }
        .url-field {
            max-width: 100%;
        }
    }
</style>
