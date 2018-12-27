<template>
  <l-map id="mapid" :zoom="zoom" :center="center" @click="setMarker">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.coordinates" :icon="icon">
      <l-popup class="break-all">
        <div>Content Type: {{getDetails(marker.fileUrl).type}}</div>
        <div>Owner: {{getDetails(marker.fileUrl).owner}}</div>
        <div>Created On: {{getDetails(marker.fileUrl).createdOn}}</div>
        <v-btn @click="redirectUser(marker)" round small color="primary">view details</v-btn>
      </l-popup>
    </l-marker>
    <v-btn fab class="map-location" @click.stop="getMyLocation">
      <v-icon dark>location_on</v-icon>
    </v-btn>
  </l-map>

</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
// import iconUrl from 'leaflet/dist/images/marker-icon.png'
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default {
  name: 'OpenMapWithMarker',
  data: () => ({
    zoom: 6,
    centerMap: L.latLng(47.413220, -1.219482),
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: L.latLng(47.413220, -1.219482),
    riseOnHover: true,
    icon: L.icon({
      iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: shadowUrl,
      iconSize: [38, 58],
      iconAnchor: [22, 57],
      popupAnchor: [-3, -76]
    })
  }),
  components: { LMap, LTileLayer, LMarker, LPopup },
  props: {
    center: {
      type: Object,
      default: () => ({
        lat: 47.413220,
        lng: -1.219482
      })
    },
    draggable: {
      type: Boolean,
      custom: true,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    markers: {
      type: Array
    }
  },
  computed: {
  },
  methods: {
    setMarker (e) {
      if (!this.readonly) {
        this.marker = e.latlng
        this.$emit('input', e.latlng)
      }
    },
    getMyLocation () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.centerMap = L.latLng(position.coords.latitude, position.coords.longitude)
      })
    },
    getDetails (url) {
      let a = url.split('/')
      return {
        'owner': a[4],
        'type': a[5].split('_')[0].toUpperCase(),
        'createdOn': new Date(Number(a[5].split('_')[1].split('.')[0])).toLocaleString()
      }
    },
    async redirectUser (content) {
      await this.$store.dispatch('ACTION_GET_CONTENT', content.fileUrl)
      if (content.fileUrl.includes('marker')) this.$router.push({name: 'OwnedMarkers'})
      else if (content.fileUrl.includes('tag')) this.$router.push({name: 'Owned'})
      else if (content.fileUrl.includes('image')) this.$router.push({name: 'OwnedImages'})
      else if (content.fileUrl.includes('event')) this.$router.push({name: 'OwnedEvents'})
    }
  }
}
</script>

<style lang="scss" scoped>
.break-all {
  word-break: break-all
}
.vue2leaflet-map {
    height: 300px;
    z-index: 0;
    position: relative;

    .map-location {
        position: absolute;
        left: 5px;
        bottom: 5px;
        z-index: 410;
        height: 30px;
        width: 30px;
    }

    .leaflet-control-container {
      border: 2px red solid;

    .leaflet-bar {
      border-top-left-radius: 15px;
      overflow: hidden;
    }
    }
}
</style>
