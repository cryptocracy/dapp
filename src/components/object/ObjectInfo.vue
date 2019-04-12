<template>
  <v-card class="container mt-4">
    <div class="image-container" v-if="object.image">
      <span v-if="object.title" class="image-title">{{ object.title }}</span>
      <img v-if="object.image" :src="object.image" class="main-image">
    </div>
    <div v-else>
      <div class="entity-title d-flex justify-space-between" v-if="object.title">
        {{ object.title }}
        <v-flex xs3>
          <Voter :itemsObject="object" :type="type"></Voter>
        </v-flex>
      </div>
    </div>
    <v-list two-line>
      <v-list-tile v-if="isLoading">
        <v-progress-linear
          indeterminate
          color="grey lighten-1"
          class="mb-0"
        ></v-progress-linear>
      </v-list-tile>
      <v-list-tile v-if="object.description">
        <v-list-tile-content>
          <v-list-tile-title v-html="object.description"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.ownername">
        <v-list-tile-content>
          <v-list-tile-sub-title>Published by</v-list-tile-sub-title>
          <v-list-tile-title v-html="object.ownername"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.start">
        <v-list-tile-content>
          <v-list-tile-sub-title>Start date & time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(object.start).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.end">
        <v-list-tile-content>
          <v-list-tile-sub-title>End date & time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(object.end).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.tags && object.tags.length">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ object.tags.length>1 ? 'Tags' : 'Tag' }}</v-list-tile-sub-title>
          <div>
            <template v-for="tag in object.tags">
              <v-chip :key="tag.address">{{ '#' + tag.title }}</v-chip>
            </template>
          </div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.images && object.images.length">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ object.images.length>1 ? 'Images' : 'Image' }}</v-list-tile-sub-title>
          <div>
            <template v-for="image in object.images">
              <v-chip :key="image.address">{{ image.title }}</v-chip>
            </template>
          </div>
        </v-list-tile-content>
      </v-list-tile>
      <!--<v-list-tile v-if="object.private">-->
      <!--<v-list-tile-content>-->
      <!--<v-list-tile-sub-title>Privacy</v-list-tile-sub-title>-->
      <!--<v-list-tile-title v-html="object.private ? 'Private' : 'Public'"></v-list-tile-title>-->
      <!--</v-list-tile-content>-->
      <!--</v-list-tile>-->
      <div v-if="!isLoading" class="entity-actions">
        <router-link v-if="!hubUrl && isOwned" color="cyan lighten-1" class="entity-action entity-action--edit"
                     :to="{ name: 'Edit' + type.charAt(0).toUpperCase() + type.slice(1), params: {objectProp: object}}">
          <v-icon color="cyan lighten-1">edit</v-icon>
          Edit
        </router-link>
        <a v-if="isFavorite" class="entity-action entity-action--favorite" @click="removeFromFavorite">
          <v-icon color="teal lighten-1">favorite_border</v-icon>
          <span class="teal--text text--lighten-1">Remove from Favorite</span>
        </a>
        <a v-if="!isFavorite" class="entity-action entity-action--favorite" @click="addToFavorite">
          <v-icon color="teal lighten-1">favorite</v-icon>
          <span class="teal--text text--lighten-1">Add to Favorite</span>
        </a>
        <a class="entity-action entity-action--wallet" color="brown lighten-1"
           @click="redirectUser(object.address)">
          <v-icon color="brown lighten-1">account_balance_wallet</v-icon>
          <span class="brown--text text--lighten-1">Donate Crypto</span>
        </a>
        <a v-if="markerCenter" class="entity-action entity-action--marker" @click="isShowMarker = !isShowMarker">
          <v-icon color="red lighten-1">place</v-icon>
          <span class="red--text text--lighten-1">View Marker</span>
        </a>
      </div>
      <open-map-with-marker v-if="isShowMarker" :center="markerCenter" readonly/>
      <v-list-tile v-if="object.symbol">
        <v-list-tile-content>
          <v-list-tile-sub-title>Symbol</v-list-tile-sub-title>
          <v-list-tile-title v-html="object.symbol"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.address">
        <v-list-tile-content>
          <v-list-tile-sub-title>Crypto Address</v-list-tile-sub-title>
          <v-list-tile-title v-html="object.address"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <div class="json-address">
          <v-text-field
            ref="urlInput"
            :value="objectUrl"
            class="url-field"
            readonly
          />
          <v-btn class="button-copy" color="#20C3A5" @click="copyUrl">{{ copyButtonText }}</v-btn>
        </div>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Privacy</v-list-tile-sub-title>
          <v-list-tile-title v-html="object.private ? 'Private' : 'Public'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Archived</v-list-tile-sub-title>
          <v-list-tile-title v-html="object.archived ? 'Yes' : 'No'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="object.createdtime">
        <v-list-tile-content>
          <v-list-tile-sub-title>Date Created</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(object.createdtime).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
import storageService from '@/services/blockstack-storage'
import OpenMapWithMarker from '@/components/maps/OpenMapWithMarker'
import Voter from '@/components/vote-buttons/voter'
import { mapGetters } from 'vuex'

export default {
  name: 'ObjectInfo',
  data: function () {
    return {
      copyButtonText: 'Copy',
      isFavorite: false,
      isLoading: false,
      isShowMarker: this.type === 'marker',
      markerCenter: null
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    hubUrl: {
      type: String
    }
  },
  components: {
    OpenMapWithMarker,
    Voter
  },
  computed: {
    ...mapGetters({
      object: 'getContentData'
    }),
    objectUrl () {
      // parsing blockstack gaia hub cong from localhost for creating hub url
      const urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
      // creating hub url(where our files are stored)
      const hubUrl = this.hubUrl ? `${urlItems.url_prefix}${this.hubUrl}/` : `${urlItems.url_prefix}${this.object.owner}/`
      return this.object ? `${hubUrl}${this.type}_${this.object.createdtime}.json` : ''
    },
    isOwned () {
      return storageService.isResourceOwned(this.object.owner)
    }
  },
  methods: {
    redirectUser (address) {
      this.$store.state.BTCAddress = address
      this.$router.push({name: 'Send'})
    },
    getFavObjectName () {
      const objectUrlArr = this.objectUrl.split('/')
      return `${objectUrlArr.pop().split('.')[0]}_${objectUrlArr.pop()}`
    },
    copyUrl (e) {
      this.$refs.urlInput.$refs.input.select()
      document.execCommand('copy')
      this.copyButtonText = 'Copied!'
      setTimeout(() => {
        this.copyButtonText = 'Copy'
      }, 2000)
    },
    addToFavorite () {
      this.isLoading = true
      storageService.updateFavoriteObjectIndex(this.getFavObjectName(), this.object.title, this.type)
        .then(() => {
          this.isFavorite = true
          this.isLoading = false
        })
    },
    removeFromFavorite () {
      this.isLoading = true
      storageService.reduceFavoriteObjectIndex(this.getFavObjectName(), this.object.title, this.type)
        .then(() => {
          this.isFavorite = false
          this.isLoading = false
        })
    }
  },
  mounted () {
    if (!this.hubUrl) {
      this.$store.commit('toggleLoading')
      storageService.getFile({fileName: 'my_fav_' + this.type + 's.json', options: {decrypt: false}})
        .then(res => {
          if (res) {
            this.isFavorite = !!res[this.getFavObjectName()]
          }
        })
        .then(() => {
          if (this.object.marker) {
            axios.get(this.object.marker.address)
              .then(res => {
                if (res) {
                  this.markerCenter = res.data.coordinates
                }
                this.$store.commit('toggleLoading')
              })
              .catch(e => this.$store.commit('toggleLoading'))
          } else {
            if (this.object.coordinates) this.markerCenter = this.object.coordinates
            this.$store.commit('toggleLoading')
          }
        })
    }
  },
  destroyed () {
    this.$store.commit('MUTATION_SET_CONTENT_DATA', null)
  }
}
</script>
