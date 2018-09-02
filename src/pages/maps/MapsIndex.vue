<template lang="html">
  <div>
    <v-layout flex-wrap row>
      <v-flex md6 xs12>
        <app-layout
          title="Simple Map"
          :children="SimpleMap"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="Map With Marker"
          :children="MapWithMarker"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="Map With Dragable Marker"
          :children="MapDragable"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="Map With Multiple Marker"
          :children="MapWithMultipleMarker"
          >
        </app-layout>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import SimpleMap from '@/components/maps/Simplemap'
import MapWithMarker from '@/components/maps/MapWithMarker'
import MapDragable from '@/components/maps/MapDragable'
import MapWithMultipleMarker from '@/components/maps/MapWithMultipleMarker'

export default {
  data: () => ({
    SimpleMap,
    MapWithMarker,
    MapDragable,
    MapWithMultipleMarker
  })
}
</script>

<style lang="css">
</style>
