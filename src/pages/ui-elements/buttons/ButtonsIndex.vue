<template lang="html">
  <v-layout row flex-wrap>
    <v-flex md6>
      <app-layout
        title="Raised Buttons"
        :children="RaisedButtons"
      ></app-layout>
      <app-layout
        title="Depressed Buttons no Shadow"
        :children="DepressedButtons"
        ></app-layout>
      <app-layout
        title="Depressed Buttons no Shadow"
        :children="IconButtons"
      ></app-layout>
      <app-layout
        title="Depressed Buttons no Shadow"
        :children="OutlineButtons"
      ></app-layout>
    </v-flex>
    <v-flex md6>
      <app-layout
        title="Flat Buttons with Size"
        :children="FlatButtons"
      ></app-layout>
      <app-layout
        title="Toggle Buttons"
        :children="ToggleButtons"
      ></app-layout>
      <app-layout
        title="Loading Buttons"
        :children="LoadingButtons"
      ></app-layout>
    </v-flex>
  </v-layout>

</template>

<script>
import RaisedButtons from '@/components/ui-elements/buttons/RaisedButtons'
import FlatButtons from '@/components/ui-elements/buttons/FlatButtons'
import DepressedButtons from '@/components/ui-elements/buttons/DepressedButtons'
import ToggleButtons from '@/components/ui-elements/buttons/ToggleButtons'
import IconButtons from '@/components/ui-elements/buttons/IconButtons'
import LoadingButtons from '@/components/ui-elements/buttons/LoadingButtons'
import OutlineButtons from '@/components/ui-elements/buttons/OutlineButtons'

export default {
  data: () => ({
    RaisedButtons,
    FlatButtons,
    DepressedButtons,
    ToggleButtons,
    IconButtons,
    LoadingButtons,
    OutlineButtons
  })
}
</script>

<style lang="css">
  .primary--text.btn--flat {
    color: #1ebea5 !important;
  }
</style>
