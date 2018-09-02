<template lang="html">
  <v-layout row flex-wrap>
    <v-flex md6 xs12>
      <app-layout
        title="Basic Time Picker"
        :children="BasicTimePicker"
        >
        </app-layout>
    </v-flex>
    <v-flex md6 xs12>
      <app-layout
        title="Time Picker With 24hr Format"
        :children="TimePickerFormat"
        >
      </app-layout>
    </v-flex>
    <v-flex md12 xs12>
      <app-layout
        title="Landscape Time Picker"
        :children="LandscapeTimePicker"
        >
      </app-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import BasicTimePicker from '@/components/ui-elements/time-pickers/BasicTimePicker'
import TimePickerFormat from '@/components/ui-elements/time-pickers/TimePickerFormat'
import LandscapeTimePicker from '@/components/ui-elements/time-pickers/LandscapeTimePicker'

export default {
  data: () => ({
    BasicTimePicker,
    TimePickerFormat,
    LandscapeTimePicker
  })
}
</script>

<style lang="css">
</style>
