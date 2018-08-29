<template>
    <div class="container">
        <v-list two-line>
            <template v-for="(item, index) in tagObject">
                <template v-if="item">
                <v-list-tile
                    v-if="index!='image' && index!='coordinates'"
                    :key="index"
                >
                    <v-list-tile-content>
                        <v-list-tile-sub-title v-html="index"></v-list-tile-sub-title>
                        <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </template>
            </template>

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