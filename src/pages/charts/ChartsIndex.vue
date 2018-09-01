<template>
  <div>
    <v-layout wrap row>
      <v-flex md6>
        <app-layout
          title="Line chart"
          height="300px"
          :children="LineChart"
        >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Bar chart"
          height="300px"
          :children="BarChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Tiny bar chart"
          height="300px"
          :children="tinyChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Horizontal bar chart"
          height="300px"
          :children="HorizontalBarChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Doughnut chart"
          height="300px"
          :children="DoughnutChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Pie chart"
          height="300px"
          :children="PieChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Polar area chart"
          height="300px"
          :children="PolarAreaChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Radar chart"
          height="300px"
          :children="RadarChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Bubbles chart"
          height="300px"
          :children="BubbleChart"
          >
        </app-layout>
      </v-flex>

      <v-flex md6>
        <app-layout
          title="Scatter chart"
          height="300px"
          :children="ScatterChart"
          >
        </app-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LineChart from '@/components/charts/line-chart/LineChart'
import BarChart from '@/components/charts/bar-chart/BarChart'
import tinyChart from '@/components/total-downloads/TotalDownloads'
import HorizontalBarChart from '@/components/charts/horizontal-bar/horizontalBarChart'
import DoughnutChart from '@/components/charts/doughnut/DoughnutChart'
import PieChart from '@/components/charts/pie-chart/PieChart'
import PolarAreaChart from '@/components/charts/polar-area/PolarAreaChart'
import RadarChart from '@/components/charts/radar-chart/RadarChart'
import BubbleChart from '@/components/charts/bubble-chart/BubbleChart'
import ScatterChart from '@/components/charts/scatter-chart/ScatterChart'

export default {
  data: () => ({
    LineChart,
    BarChart,
    tinyChart,
    HorizontalBarChart,
    DoughnutChart,
    PieChart,
    PolarAreaChart,
    RadarChart,
    BubbleChart,
    ScatterChart
  })

}
</script>

<style scoped>

</style>
