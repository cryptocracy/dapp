<template lang="html">
  <div>
    <v-layout flex-wrap row>
      <v-flex md12>
        <app-layout
          title="Grid List"
          :children="GridList"
          >
        </app-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import GridList from '@/components/ui-elements/grid-lists/GridList';

  export default {
    data: () => ({
      GridList,
    }),
  };
</script>

<style lang="css">
</style>
