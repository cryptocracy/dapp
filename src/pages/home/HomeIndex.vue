<template lang="html">
  <div class="">
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

<!--      <v-flex md12>
        <app-layout
          title="User Table"
          :children="UserTable"
        >
        </app-layout>
      </v-flex>-->
    </v-layout>

  </div>
</template>

<script>
import BoxWrapper from '@/components/icon-box/BoxWrapper';
import LineChart from '@/components/charts/line-chart/LineChart';
import BarChart from '@/components/charts/bar-chart/BarChart';
import UserTable from '@/components/tables/data-tables/UserTable';

export default {
  components: {
    'app-box': BoxWrapper,
  },
  data: () => ({
    LineChart,
    BarChart,
    UserTable,
  }),
};
</script>

<style lang="css">
</style>
