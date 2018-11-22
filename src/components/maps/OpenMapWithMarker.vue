<template>
  <l-map id="mapid" :zoom="zoom" :center="centerMap" @click="setMarker">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="marker" :icon="icon"></l-marker>
    <v-btn fab small class="map-location" @click.stop="getMyLocation">
      <v-icon dark>location_on</v-icon>
    </v-btn>
  </l-map>

</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default {
  name: 'OpenMapWithMarker',
  data: () => ({
    zoom: 13,
    centerMap: L.latLng(47.413220, -1.219482),
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: L.latLng(47.413220, -1.219482),
    riseOnHover: true,
    icon: L.icon({
      iconRetinaUrl: iconRetinaUrl,
      iconUrl: iconUrl,
      shadowUrl: shadowUrl,
      iconSize: [38, 58],
      iconAnchor: [22, 57],
      popupAnchor: [-3, -76]
    })
  }),
  components: { LMap, LTileLayer, LMarker },
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
    }
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
    }
  },
  mounted () {
    this.centerMap = { ...this.center }
    this.marker = this.center
  }
}
</script>

<style lang="scss" scoped>
.vue2leaflet-map {
    height: 300px;
    z-index: 0;
    position: relative;

    .map-location {
        position: absolute;
        left: 10px;
        bottom: 10px;
        z-index: 410
    }
}
</style>
