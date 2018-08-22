<template lang="html">
  <div>
    <v-layout row flex-wrap>
      <v-flex md6 xs12>
        <app-layout
          title="Basic Card"
          :children="BasicCard"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="Media With Text"
          :children="MediaWithText"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="Horizontal Card"
          :children="HorizontalCard"
          >
        </app-layout>
      </v-flex>
      <v-flex md6 xs12>
        <app-layout
          title="Custom Action"
          :children="CustomAction"
          >
        </app-layout>
      </v-flex>


    </v-layout>
  </div>
</template>

<script>
  import BasicCard from '@/components/ui-elements/cards/BasicCard';
  import MediaWithText from '@/components/ui-elements/cards/MediaWithText';
  import HorizontalCard from '@/components/ui-elements/cards/HorizontalCard';
  import CustomAction from '@/components/ui-elements/cards/CustomAction';

  export default {
    data: () => ({
      BasicCard,
      MediaWithText,
      HorizontalCard,
      CustomAction,
    }),
  };
</script>

<style lang="css">
</style>
