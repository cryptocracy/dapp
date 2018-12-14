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
          <a v-if="isFavorite" class="event-action" @click="removeFromFavorite">
            <v-icon color="grey lighten-1">favorite_border</v-icon>
            Remove from Favorite
          </a>
          <a v-if="!isFavorite" class="event-action" @click="addToFavorite">
            <v-icon color="grey lighten-1">favorite</v-icon>
            Add to Favorite
          </a>
          <v-divider v-if="isOwned && !hubUrl" class="divider-intermediate"/>
          <router-link v-if="isOwned && !hubUrl" class="event-action" :to="{ name: 'EditEvent', params: { eventProp: this.eventObject } }">
            <v-icon color="grey lighten-1">edit</v-icon>
            Edit
          </router-link>
        </template>
      </v-list-tile>
      <v-list-tile>
        <div class="json-address">
          <v-text-field
            ref="urlInput"
            :value="eventUrl"
            class="url-field"
            readonly
          />
          <v-btn class="button-copy" color="#20C3A5" @click="copyUrl">{{ copyButtonText }}</v-btn>
        </div>
      </v-list-tile>
      <v-list-tile v-if="eventObject.title">
        <v-list-tile-content>
          <v-list-tile-sub-title>Title</v-list-tile-sub-title>
          <v-list-tile-title v-html="eventObject.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.description">
        <v-list-tile-content>
          <v-list-tile-sub-title>Description</v-list-tile-sub-title>
          <v-list-tile-title v-html="eventObject.description"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.start">
        <v-list-tile-content>
          <v-list-tile-sub-title>Start date & time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(eventObject.start).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.end">
        <v-list-tile-content>
          <v-list-tile-sub-title>End date & time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(eventObject.end).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.tags && eventObject.tags.length">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ eventObject.tags.length>1 ? 'Tags' : 'Tag' }}</v-list-tile-sub-title>
          <div>
            <template v-for="tag in eventObject.tags">
              <v-chip :key="tag.address">{{ '#' + tag.title }}</v-chip>
            </template>
          </div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.images && eventObject.images.length">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ eventObject.images.length>1 ? 'Images' : 'Image' }}</v-list-tile-sub-title>
          <div>
            <template v-for="image in eventObject.images">
              <v-chip :key="image.address">{{ '#' + image.title }}</v-chip>
            </template>
          </div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.marker">
        <v-list-tile-content>
          <v-list-tile-sub-title>Marker</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <open-map-with-marker v-if="markerCenter" :center="markerCenter" readonly/>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Privacy</v-list-tile-sub-title>
          <v-list-tile-title v-html="eventObject.private ? 'Private' : 'Public'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Archived</v-list-tile-sub-title>
          <v-list-tile-title v-html="eventObject.archived ? 'Yes' : 'No'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.createdtime">
        <v-list-tile-content>
          <v-list-tile-sub-title>Created time</v-list-tile-sub-title>
          <v-list-tile-title v-html="new Date(eventObject.createdtime).toLocaleString()"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!--<v-list-tile v-if="eventObject.private">-->
      <!--<v-list-tile-content>-->
      <!--<v-list-tile-sub-title>Privacy</v-list-tile-sub-title>-->
      <!--<v-list-tile-title v-html="eventObject.private ? 'Private' : 'Public'"></v-list-tile-title>-->
      <!--</v-list-tile-content>-->
      <!--</v-list-tile>-->
      <v-list-tile v-if="eventObject.symbol">
        <v-list-tile-content>
          <v-list-tile-sub-title>Symbol</v-list-tile-sub-title>
          <v-list-tile-title v-html="eventObject.symbol"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="eventObject.address">
        <v-list-tile-content>
          <v-list-tile-sub-title>Address</v-list-tile-sub-title>
          <v-list-tile-title v-html="eventObject.address"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn color="teal accent-4" round dark @click="redirectUser(eventObject.address)">Donate</v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
import storageService from '@/services/blockstack-storage'
import OpenMapWithMarker from '@/components/maps/OpenMapWithMarker'

export default {
  name: 'EventInfo',
  data: () => ({
    copyButtonText: 'Copy',
    isFavorite: false,
    isLoading: false,
    markerCenter: null
  }),
  props: {
    eventObject: {
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
    eventUrl () {
      // parsing blockstack gaia hub cong from localhost for creating hub url
      const urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
      // creating hub url(where our files are stored)
      const hubUrl = this.hubUrl || `${urlItems.url_prefix}${this.eventObject.owner}/`
      return this.eventObject ? `${hubUrl}event_${this.eventObject.createdtime}.json` : ''
    },
    isOwned () {
      return storageService.isResourceOwned(this.eventObject.owner)
    }
  },
  methods: {
    redirectUser (address) {
      this.$store.state.BTCAddress = address
      this.$router.push({name: 'Send'})
    },
    getFavEventName () {
      const eventUrlArr = this.eventUrl.split('/')
      return `${eventUrlArr.pop().split('.')[0]}_${eventUrlArr.pop()}`
    },
    copyUrl (e) {
      this.$refs.urlInput.$refs.input.select()
      document.execCommand('copy')
      this.copyButtonText = 'Copied!'
      setTimeout(() => { this.copyButtonText = 'Copy' }, 2000)
    },
    addToFavorite () {
      this.isLoading = true
      console.log('REUTRNNNN', this.getFavEventName())
      storageService.updateFavoriteEventIndex(this.getFavEventName(), this.eventObject.title)
        .then(() => {
          this.isFavorite = true
          this.isLoading = false
        })
    },
    removeFromFavorite () {
      this.isLoading = true
      storageService.reduceFavoriteEventIndex(this.getFavEventName(), this.eventObject.title)
        .then(() => {
          this.isFavorite = false
          this.isLoading = false
        })
    }
  },
  mounted () {
    if (!this.hubUrl) {
      this.$store.commit('toggleLoading')
      storageService.getFile({ fileName: 'my_fav_events.json' })
        .then(res => {
          if (res) {
            this.isFavorite = !!res[this.getFavEventName()]
          }
        })
        .then(() => {
          if (this.eventObject.marker) {
            axios.get(this.eventObject.marker.address)
              .then(res => {
                if (res) {
                  this.markerCenter = res.data.coordinates
                }
                this.$store.commit('toggleLoading')
              })
              .catch(e => this.$store.commit('toggleLoading'))
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
    .event-action {
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
