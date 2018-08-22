<template lang="html">
  <div>
    <v-layout flex-wrap row>
      <v-flex md12>
        <app-layout
          title="Badges"
          :children="Badges"
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Breadcrumbs"
          :children="Breadcrumbs"
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Button Navigations"
          :children="ButtonNavigations"
          >
        </app-layout>
      </v-flex>
      <v-flex md12
        text-xs-center
        layout
        align-center
        justify-center
        >
        <app-layout
          title="Avatars"
          :children="Avatars"
          >
        </app-layout>
      </v-flex>
      <v-flex md12
        text-xs-center
        layout
        align-center
        justify-center
        >
        <app-layout
          title="Bottom Sheet"
          :children="BottomSheet"
          >
        </app-layout>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
  import Badges from '@/components/ui-elements/ui-components/Badges';
  import Breadcrumbs from '@/components/ui-elements/ui-components/Breadcrumbs';
  import ButtonNavigations from '@/components/ui-elements/ui-components/ButtonNavigations';
  import Avatars from '@/components/ui-elements/ui-components/Avatars';
  import BottomSheet from '@/components/ui-elements/ui-components/BottomSheet';

  export default {
    data: () => ({
      Badges,
      Breadcrumbs,
      ButtonNavigations,
      Avatars,
      BottomSheet,
    }),
  };
</script>

<style lang="css">
</style>
