<template lang="html">
  <div class="container">
    <div>
      <app-box></app-box>

      <v-layout row flex-wrap>
        <v-flex md6>
          <app-layout
            height="300px"
            title="mBTC Input (Recent Donations)"
            :children="LineChart"
          >
          </app-layout>
        </v-flex>
        <v-flex md6>
          <app-layout
            height="300px"
            title="mBTC Output (Recent Payouts)"
            :children="BarChart"
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
import UserTable from '@/components/tables/data-tables/UserTable'
import { mapGetters } from 'vuex'

export default {
  components: {
    'app-box': BoxWrapper
  },
  computed: {
    ...mapGetters({
      isSearching: 'isSearching',
      isResolved: 'isResolved',
      searchResult: 'getSearchResult'
    })
  },
  data: () => ({
    LineChart,
    BarChart,
    UserTable
  })
}
</script>

<style lang="css">
</style>
