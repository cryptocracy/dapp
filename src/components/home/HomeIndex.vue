<template lang="html">
  <div class="container">
    <div>
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
import { mapGetters } from 'vuex'

export default {
  components: {
    'app-box': BoxWrapper
  },
  computed: {
    ...mapGetters({
      isSearching: 'isSearching',
      isResolved: 'isResolved',
      searchResult: 'getSearchResult',
      showDonationGraph: 'showDonationGraph',
      showPayoutGraph: 'showPayoutGraph'
    })
  },
  data: () => ({
    LineChart,
    BarChart
  }),
  created () {
    this.$store.dispatch('ACTION_GET_TRANSACTIONS_DATA')
  },
  destroyed () {
    this.$store.commit('MUTATION_CHANGE_GRAPH_STATE', false)
  }
}
</script>

<style lang="css">
</style>
