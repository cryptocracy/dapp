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
          <a v-if="isFavorite && !hubUrl" class="marker-action" @click="removeFromFavorite">
            <v-icon color="grey lighten-1">favorite_border</v-icon>
            Remove from Favorite
          </a>
          <a v-if="!isFavorite && !hubUrl" class="marker-action" @click="addToFavorite">
            <v-icon color="grey lighten-1">favorite</v-icon>
            Add to Favorite
          </a>
          <v-divider v-if="!hubUrl" class="divider-intermediate"/>
          <router-link v-if="!hubUrl" class="marker-action" :to="{ name: 'EditMarker', params: { markerProp: this.markerObject } }">
            <v-icon color="grey lighten-1">edit</v-icon>
            Edit
          </router-link>
        </template>
      </v-list-tile>
      <v-list-tile>
        <div class="json-address">
          <v-text-field
            ref="urlInput"
            :value="markerUrl"
            class="url-field"
            readonly
          />
          <v-btn class="button-copy" color="#20C3A5" @click="copyUrl">{{ copyButtonText }}</v-btn>
        </div>
      </v-list-tile>
      <v-list-tile v-if="markerObject.title">
        <v-list-tile-content>
          <v-list-tile-sub-title>Title</v-list-tile-sub-title>
          <v-list-tile-title v-html="markerObject.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Privacy</v-list-tile-sub-title>
          <v-list-tile-title v-html="markerObject.private ? 'Private' : 'Public'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Archived</v-list-tile-sub-title>
          <v-list-tile-title v-html="markerObject.archived ? 'Yes' : 'No'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="markerObject.detail">
        <v-list-tile-content>
          <v-list-tile-sub-title>Details</v-list-tile-sub-title>
          <v-list-tile-title v-html="markerObject.detail"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="markerObject.createdtime">
        <v-list-tile-content>
          <v-list-tile-sub-title>Created time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(markerObject.createdtime).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!--<v-list-tile v-if="markerObject.private">-->
      <!--<v-list-tile-content>-->
      <!--<v-list-tile-sub-title>Privacy</v-list-tile-sub-title>-->
      <!--<v-list-tile-title v-html="markerObject.private ? 'Private' : 'Public'"></v-list-tile-title>-->
      <!--</v-list-tile-content>-->
      <!--</v-list-tile>-->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Map</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <open-map-with-marker
        readonly
        v-if="markerObject.coordinates"
        :center="coordinates"/>
      <v-list-tile v-if="markerObject.symbol">
        <v-list-tile-content>
          <v-list-tile-sub-title>Symbol</v-list-tile-sub-title>
          <v-list-tile-title v-html="markerObject.symbol"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="markerObject.address">
        <v-list-tile-content>
          <v-list-tile-sub-title>Address</v-list-tile-sub-title>
          <v-list-tile-title v-html="markerObject.address"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn color="teal accent-4" round dark @click="redirectUser(markerObject.address)">Donate</v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import OpenMapWithMarker from '@/components/maps/OpenMapWithMarker'
import storageService from '@/services/blockstack-storage'

export default {
  name: 'MarkerInfo',
  data: () => ({
    copyButtonText: 'Copy',
    isFavorite: false,
    isLoading: false
  }),
  components: {
    OpenMapWithMarker
  },
  props: {
    markerObject: {
      type: Object
    },
    hubUrl: {
      type: String
    }
  },
  computed: {
    coordinates () {
      return this.markerObject ? {
        lat: this.markerObject.coordinates.lat,
        lng: this.markerObject.coordinates.lng
      } : {}
    },
    markerUrl () {
      // parsing blockstack gaia hub cong from localhost for creating hub url
      let urlItems = ''
      if (localStorage['blockstack-gaia-hub-config']) {
        urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
      }
      // creating hub url(where our files are stored)
      const hubUrl = this.hubUrl || `${urlItems.url_prefix}${urlItems.address}/`
      return this.markerObject ? `${hubUrl}marker_${this.markerObject.createdtime}.json` : ''
    }
  },
  methods: {
    redirectUser (address) {
      this.$store.state.BTCAddress = address
      this.$router.push({name: 'Send'})
    },
    getFavMarkerName () {
      const markerUrlArr = this.markerUrl.split('/')
      return `${markerUrlArr.pop().split('.')[0]}_${markerUrlArr.pop()}`
    },
    copyUrl (e) {
      this.$refs.urlInput.$refs.input.select()
      document.execCommand('copy')
      this.copyButtonText = 'Copied!'
      setTimeout(() => { this.copyButtonText = 'Copy' }, 2000)
    },
    addToFavorite () {
      this.isLoading = true
      storageService.updateFavoriteMarkerIndex(this.getFavMarkerName(), this.markerObject.title)
        .then(() => {
          this.isFavorite = true
          this.isLoading = false
        })
    },
    removeFromFavorite () {
      this.isLoading = true
      storageService.reduceFavoriteMarkerIndex(this.getFavMarkerName(), this.markerObject.title)
        .then(() => {
          this.isFavorite = false
          this.isLoading = false
        })
    }
  },
  mounted () {
    if (!this.hubUrl) {
      storageService.getFile({ fileName: 'my_fav_markers.json' })
        .then(res => {
          if (res) {
            this.isFavorite = !!res[this.getFavMarkerName()]
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
    .marker-action {
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
