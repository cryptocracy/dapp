<template lang="html">
  <div>
    <v-layout row flex-wrap>
      <v-flex md6 xs12>
        <app-layout
          title="Basic List"
          :children="BasicList"
          >
        </app-layout>

        <app-layout
          title="List With Three Lines"
          :children="ListThreeLines"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="List With Icon"
          :children="ListWithIcon"
          >
        </app-layout>
        <app-layout
          title="List With Action"
          :children="ListWithAction"
          >
        </app-layout>
      </v-flex>
    </v-layout>
  </div>


</template>

<script>
  import BasicList from '@/components/ui-elements/lists/BasicList';
  import ListWithIcon from '@/components/ui-elements/lists/ListWithIcon';
  import ListThreeLines from '@/components/ui-elements/lists/ListThreeLines';
  import ListWithAction from '@/components/ui-elements/lists/ListWithAction';

  export default {
    data: () => ({
      BasicList,
      ListWithIcon,
      ListThreeLines,
      ListWithAction,
    }),
  };
</script>

<style lang="css">
</style>
