<template>
  <v-card class="container">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="marker.title"
        :rules="titleRules"
        :counter="10"
        :disabled="isLoading"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="marker.detail"
        label="Detail"
      ></v-text-field>
      <v-select
        :items="symbols"
        label="Symbol"
        v-model="marker.symbol"
        :disabled="isLoading"
      ></v-select>
      <v-text-field
        v-model="marker.address"
        :rules="addressRules"
        :counter="42"
        label="Address"
        :disabled="isLoading"
      ></v-text-field>
      <open-map-with-marker @input="changeCoordinates"/>
      <!--<div class="geo-button-wrapper" v-if="markerProp">-->
      <!--<template v-if="!newGeo">-->
      <!--<v-btn-->
      <!--fab-->
      <!--dark-->
      <!--small-->
      <!--color="green pa-2"-->
      <!--@click="updateGeoPosition"-->
      <!--&gt;-->
      <!--<v-icon>location_searching</v-icon>-->
      <!--</v-btn>-->
      <!--<span class="geo-button-text">Update marker geo location</span>-->
      <!--</template>-->
      <!--<template v-else>-->
      <!--<v-btn-->
      <!--fab-->
      <!--dark-->
      <!--small-->
      <!--color="green pa-2"-->
      <!--@click="rollbackGeoPosition"-->
      <!--&gt;-->
      <!--<v-icon>location_disabled</v-icon>-->
      <!--</v-btn>-->
      <!--<span class="geo-button-text">Rollback to old marker geo location</span>-->
      <!--</template>-->
      <!--</div>-->
      <div class="switch-wrapper">
        <div class="input-group--text-field primary--text">Privacy</div>
        <div class="switch-block">
          <span class="switch-text">Public</span>
          <v-switch v-model="marker.private"></v-switch>
          <span class="switch-text">Personal</span>
        </div>
      </div>
      <div class="switch-wrapper" v-if="markerProp">
        <div class="input-group--text-field primary--text">Archived</div>
        <div class="switch-block">
          <span class="switch-text">No</span>
          <v-switch v-model="marker.archived"></v-switch>
          <span class="switch-text">Yes</span>
        </div>
      </div>
      <v-btn
        :disabled="!valid || isLoading "
        @click="submit"
      >
        submit
      </v-btn>
      <v-btn
        @click="clear"
        :disabled="isLoading"
      >
        clear
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import storageService from '@/services/blockstack-storage'
import OpenMapWithMarker from '@/components/maps/OpenMapWithMarker'

export default {
  data: () => ({
    blockstack: window.blockstack,
    isLoading: false,
    valid: false,
    newGeo: false,
    marker: {
      coordinates: null,
      title: '',
      address: '',
      detail: '',
      symbol: null,
      private: false,
      archived: false,
      v: '0.0.1',
      id: ''
    },
    symbols: ['BTC', 'STX'],
    titleRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      v => /^\w+$/.test(v) || 'Letters, numbers and "_" are only allowed'
    ],
    addressRules: [
      v => v ? /^((?!_)[A-z0-9])+$/.test(v) || 'Letters and numbers are only allowed' : true,
      v => v ? v.length <= 42 || 'Please enter proper address' : true
    ]
  }),
  props: {
    markerProp: {
      type: [Object, null],
      default: null
    }
  },
  components: {
    OpenMapWithMarker
  },
  watch: {
    markerProp () {
      this.updateFromMarkerProp()
    }
  },
  methods: {
    submit () {
      const timestamp = +new Date()
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.marker.createdtime = this.markerProp ? this.markerProp.createdtime : timestamp
        this.marker.owner = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
        this.saveMarker(timestamp)
      }
    },
    getMarkerFilename (timestamp) {
      return this.markerProp ? `marker_${this.markerProp.createdtime}.json` : `marker_${timestamp}.json`
    },
    saveMarker (timestamp) {
      this.blockstack.putFile(this.getMarkerFilename(timestamp), JSON.stringify(this.marker))
        .then((jsonUrl) => {
          storageService.updateMarkerIndex(jsonUrl.split('/').pop().split('.')[0], this.marker.title)
            .then(() => {
              this.isLoading = false
              this.markerProp ? this.$router.push({
                name: 'MarkerInfo',
                params: {
                  markerName: 'marker_' + this.marker.createdtime,
                  markerObject: this.marker
                } }) : this.clear()
            })
        })
    },
    clear () {
      this.$refs.form.reset()
    },
    updateFromMarkerProp () {
      if (this.markerProp) {
        console.log('update')
        for (let property in this.markerProp) {
          this.marker[property] = this.markerProp[property] instanceof Object ? { ...this.markerProp[property] } : this.markerProp[property]
        }
      } else {
        this.clear()
      }
    },
    changeCoordinates (newCoords) {
      this.marker.coordinates = newCoords
    }
  },
  mounted () {
    this.updateFromMarkerProp()
  }
}
</script>

<style lang="scss">
    .switch-block {
        display: flex;
        height: 30px;
        margin-bottom: 20px;
        align-items: center;
        .switch-text {
            font-size: 16px;
        }
        .input-group {
            flex: 0;
            margin: auto 10px;

            .input-group__details {
                display: none;
            }
        }
    }
    .geo-button-wrapper {
        display: flex;
        align-items: center;
        margin-left: -8px;
        padding-bottom: 10px;
    }
</style>
