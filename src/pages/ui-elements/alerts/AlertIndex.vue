<template>
  <v-layout>
    <v-flex>
      <app-layout
        title="Basic Alerts"
        :children="BasicAlerts"
        >
      </app-layout>
      <app-layout
        title="Closeable Alerts"
        :children="CloseableAlerts"
        >
      </app-layout>
      <app-layout
        title="Outline Alerts"
        :children="OutlineAlerts"
        >
      </app-layout>
    </v-flex>

  </v-layout>
</template>

<script>
import BasicAlerts from '@/components/ui-elements/alerts/BasicAlerts'
import CloseableAlerts from '@/components/ui-elements/alerts/CloseableAlerts'
import OutlineAlerts from '@/components/ui-elements/alerts/OutlineAlerts'

export default {
  data: () => ({
    BasicAlerts,
    CloseableAlerts,
    OutlineAlerts
  })

}
</script>

<style scoped>

</style>
