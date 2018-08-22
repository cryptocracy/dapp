<template lang="html">
  <div>
    <app-layout
      title="Basic App Bar"
      :children="BasicBar"
      ></app-layout>
    <app-layout
      title="App Bar With right Icon"
      :children="BarWithRightIcon "
      ></app-layout>
    <app-layout
      title="App Bar With Extension"
      :children="BarWithExtension"
      ></app-layout>
    <app-layout
      title="App Bar With Menu"
      :children="BarWithMenu"
      ></app-layout>
  </div>

</template>

<script>
import BasicBar from '@/components/ui-elements/app-bars/BasicBar';
import BarWithRightIcon from '@/components/ui-elements/app-bars/BarWithRightIcon';
import BarWithExtension from '@/components/ui-elements/app-bars/BarWithExtension';
import BarWithMenu from '@/components/ui-elements/app-bars/BarWithMenu';

export default {
  data: () => ({
    BasicBar,
    BarWithRightIcon,
    BarWithExtension,
    BarWithMenu,
  }),
};
</script>

<style lang="css">
</style>
