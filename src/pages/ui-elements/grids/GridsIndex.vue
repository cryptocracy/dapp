<template lang="html">
  <v-layout>
    <v-flex>
      <app-layout
        title="Basic Grid"
        :children="BasicGrid"
        >
      </app-layout>

      <app-layout
        title="Offset Grid"
        :children="OffsetGrid"
        >
      </app-layout>

      <app-layout
        title="Order Grid"
        :children="OrderGrid"
        >
      </app-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import BasicGrid from '@/components/ui-elements/grids/BasicGrid';
  import OffsetGrid from '@/components/ui-elements/grids/OffsetGrid';
  import OrderGrid from '@/components/ui-elements/grids/OrderGrid';

  export default {
    data: () => ({
      BasicGrid,
      OffsetGrid,
      OrderGrid,
    }),

  };
</script>

<style lang="css">
</style>
