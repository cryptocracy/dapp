<template lang="html">
  <div class="container-fluid">
    <div>
      <v-layout transition="slide-y-transition" row class="mt-0 mb-3" v-if="proximitySearchResult">
        <v-flex col>
          <v-subheader class="pl-0 mt-0">Content near you</v-subheader>
          <span v-if="proximitySearchResult.length > 0" color="grey">Try clicking the marker icon for more details.</span>
          <span v-else color="grey">Try changing your epicenter or increasing your search radius to discover content.</span>
          <OpenMapWithMultipleMarkers
            :markers="proximitySearchResult"
            :center="{lat: settings.latitude, lng: settings.longitude}"
          >
          </OpenMapWithMultipleMarkers>
        </v-flex>
      </v-layout>
      <app-box></app-box>

      <v-layout row flex-wrap>
        <v-flex md6>
          <app-layout
            height="300px"
            title="Wallet Input (Received)"
            :children="LineChart"
            :showGraph="showDonationGraph"
            error_message_title = "No Donations found."
            error_message="Be patient, it may take time for other users to show interest in your content."
          >
          </app-layout>
        </v-flex>
        <v-flex md6>
          <app-layout
            height="300px"
            title="Wallet Output (Payouts)"
            :children="BarChart"
            :showGraph="showPayoutGraph"
            error_message_title = "No Payouts found."
            error_message="Looks like you have not initiated any payouts yet."
          >
          </app-layout>
        </v-flex>

        <!-- <v-flex md12>
          <app-layout
            title="User Table"
            :children="UserTable"
          >
          </app-layout>
        </v-flex>-->
      </v-layout>
    </div>

  </div>
</template>

<script>
import BoxWrapper from '@/components/icon-box/BoxWrapper'
import LineChart from '@/components/charts/line-chart/LineChart'
import BarChart from '@/components/charts/bar-chart/BarChart'
import storageService from '@/services/blockstack-storage'
import OpenMapWithMultipleMarkers from '@/components/maps/OpenMapWithMultipleMarkers'
import { mapGetters } from 'vuex'

export default {
  components: {
    'app-box': BoxWrapper,
    OpenMapWithMultipleMarkers
  },
  computed: {
    ...mapGetters({
      isSearching: 'isSearching',
      isResolved: 'isResolved',
      searchResult: 'getSearchResult',
      showDonationGraph: 'showDonationGraph',
      showPayoutGraph: 'showPayoutGraph',
      settings: 'getSettings',
      proximitySearchResult: 'getProximitySearchResult'
    })
  },
  data: () => ({
    LineChart,
    BarChart
  }),
  created () {
    this.$store.dispatch('ACTION_GET_TRANSACTIONS_DATA')
    storageService.getFile({
      fileName: 'settings.json',
      options: {decrypt: true}
    }).then(res => {
      if (res) {
        this.$store.commit('MUTATION_CHANGE_SETTINGS', res)
        this.searchProximity(res)
      } else {
        this.searchProximity(this.settings)
        this.createFile()
      }
    })
  },
  methods: {
    createFile () {
      storageService.putFile({
        fileName: 'settings.json',
        data: this.settings,
        options: {encrypt: true}
      })
    },
    searchProximity (settings) {
      let queryObj = {
        lat: settings.latitude,
        lng: settings.longitude,
        distance: settings.searchRadius,
        unit: settings.distanceUnit
      }
      this.$store.dispatch('ACTION_PROXIMITY_SEARCH', queryObj)
    }
  }
}
</script>

<style scoped lang="css">
span {
  color: grey
}
</style>
