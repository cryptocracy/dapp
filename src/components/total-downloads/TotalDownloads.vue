<template lang="html">
  <div class="an-chart-content">
    <div class="an-chart-details">
      <div class="left">
        <h3>1,256 <span>Downloads</span></h3>
      </div>
      <div class="right">
        <p>42%</p>
      </div>
    </div>
    <app-bar-chart-thin :height="130"></app-bar-chart-thin>
  </div>

</template>

<script>
import BarChartThin from '@/components/charts/bar-chart/BarChartThin'

export default {
  components: {
    'app-bar-chart-thin': BarChartThin
  }
}
</script>

<style lang="css">
</style>
