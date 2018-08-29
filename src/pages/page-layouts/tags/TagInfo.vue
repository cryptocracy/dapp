<template>
    <div class="container">
        <v-list two-line>
            <v-list-tile>
                <div class="json-address">
                    <v-text-field
                        ref="urlInput"
                        v-model="tagUrl"
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
            <v-list-tile v-if="tagObject.detail">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Details</v-list-tile-sub-title>
                    <v-list-tile-title v-html="tagObject.detail"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="tagObject.createdtime">
                <v-list-tile-content>
                    <v-list-tile-sub-title>Created time</v-list-tile-sub-title>
                    <v-list-tile-title v-html="new Date(tagObject.createdtime).toLocaleString()"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-sub-title>Image</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <img v-if="tagObject.image.url" :src="tagObject.image.url" class="tag-image">

            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-sub-title>Map</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <map-with-marker
                v-if="tagObject.coordinates"
                :center="coordinates"/>
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
    </div>
</template>

<script>
  import MapWithMarker from '../../../components/maps/MapWithMarker';

  export default {
    name: "TagInfo",
    data: () => ({
      blockstack: window.blockstack,
      copyButtonText: 'Copy',
    }),
    components: {
      MapWithMarker
    },
    props: {
      tagObject: {
        type: Object
      },
    },
    computed: {
      coordinates() {
        return this.tagObject ? {
          lat: this.tagObject.coordinates.latitude,
          lng: this.tagObject.coordinates.longitude,
        } : {};
      },
      tagUrl() {
        // parsing blockstack gaia hub cong from localhost for creating hub url
        const urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config']);
        // creating hub url(where our files are stored)
        const hubUrl = `${urlItems.url_prefix}${urlItems.address}/`;
        return this.tagObject ? `${hubUrl}tag_${this.tagObject.createdtime}.json` : '';
      },
    },
    methods: {
      copyUrl(e) {
        this.$refs.urlInput.$refs.input.select();
        document.execCommand('copy');
        this.copyButtonText = 'Copied!';
        setTimeout(() => { this.copyButtonText = 'Copy' }, 2000);
      },
    }
  }
</script>

<style scoped lang="scss">
    .tag-image {
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