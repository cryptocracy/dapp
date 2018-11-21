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
                    <a v-if="isFavorite" class="tag-action" @click="removeFromFavorite">
                        <v-icon color="grey lighten-1">favorite_border</v-icon>
                        Remove from Favorite
                    </a>
                    <a v-else class="tag-action" @click="addToFavorite">
                        <v-icon color="grey lighten-1">favorite</v-icon>
                        Add to Favorite
                    </a>
                    <v-divider class="divider-intermediate"/>
                    <router-link class="tag-action" :to="{ name: 'EditTag', params: { tagProp: this.tagObject } }">
                        <v-icon color="grey lighten-1">edit</v-icon>
                        Edit
                    </router-link>
                </template>
            </v-list-tile>
            <v-list-tile>
                <div class="json-address">
                    <v-text-field
                        ref="urlInput"
                        :value="tagUrl"
                        class="url-field"
                        readonly
                    />
                    <v-btn class="button-copy" color="#20C3A5" @click="copyUrl">{{ copyButtonText }}</v-btn>
                </div>
            </v-list-tile>
            <v-list-tile v-if="tagObject.title">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Title</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-sub-title>Privacy</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.private ? 'Private' : 'Public'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-sub-title>Archived</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.archived ? 'Yes' : 'No'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="tagObject.createdtime">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Created time</v-list-tile-sub-title>
                    <v-list-tile-title v-html="new Date(tagObject.createdtime).toLocaleString()"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="tagObject.private">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Privacy</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.private ? 'Private' : 'Public'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="tagObject.symbol">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Symbol</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.symbol"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="tagObject.address">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Address</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.address"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
import storageService from '@/services/blockstack-storage'

export default {
  name: 'TagInfo',
  data: () => ({
    copyButtonText: 'Copy',
    isFavorite: false,
    isLoading: false
  }),
  props: {
    tagObject: {
      type: Object
    }
  },
  computed: {
    tagUrl () {
      // parsing blockstack gaia hub cong from localhost for creating hub url
      const urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
      // creating hub url(where our files are stored)
      const hubUrl = `${urlItems.url_prefix}${urlItems.address}/`
      return this.tagObject ? `${hubUrl}tag_${this.tagObject.createdtime}.json` : ''
    }
  },
  methods: {
    getFavTagName () {
      const tagUrlArr = this.tagUrl.split('/')
      return `${tagUrlArr.pop().split('.')[0]}_${tagUrlArr.pop()}`
    },
    copyUrl (e) {
      this.$refs.urlInput.$refs.input.select()
      document.execCommand('copy')
      this.copyButtonText = 'Copied!'
      setTimeout(() => { this.copyButtonText = 'Copy' }, 2000)
    },
    addToFavorite () {
      this.isLoading = true
      storageService.updateFavoriteTagIndex(this.getFavTagName(), this.tagObject.title)
        .then(() => {
          this.isFavorite = true
          this.isLoading = false
        })
    },
    removeFromFavorite () {
      this.isLoading = true
      storageService.reduceFavoriteTagIndex(this.getFavTagName(), this.tagObject.title)
        .then(() => {
          this.isFavorite = false
          this.isLoading = false
        })
    }
  },
  mounted () {
    storageService.getFile({fileName: 'my_fav_tags.json'})
      .then(res => {
        if (res) {
          this.isFavorite = !!res[this.getFavTagName()]
        }
      })
    storageService.getFile({fileName: 'my_fav_tags.json'})
      .then(res => {
        if (res) {
          this.isFavorite = !!res[this.getFavTagName()]
        }
      })
  }
}
</script>

<style scoped lang="scss">
    .divider-intermediate {
        flex: 0 15px;
    }
    .tag-action {
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
