<template>
    <div class="container">
        <v-list two-line>
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
      blockstack: window.blockstack
    }),
    components: {
      MapWithMarker
    },
    props: {
      tagObject: {
        type: Object
      }
    },
    computed: {
      coordinates() {
        return this.tagObject ? {
          lat: this.tagObject.coordinates.latitude,
          lng: this.tagObject.coordinates.longitude,
        } : {};
      },
    },
  }
</script>

<style scoped>
    .tag-image {
        max-width: 100%;
    }
</style>