<template lang="html">
  <div>
    <v-layout row flex-wrap>
      <v-flex md6>
        <app-layout
          title="Circular Progress"
          :children= CircularProgress
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Circular Progress Color"
          :children= CircularColor
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Circular Progress Indeterminate"
          :children= CircularIndeterminate
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Circular Rotate"
          :children= CircularRotate
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Bar Indeternimate"
          :children= BarIndeterminate
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Progressbar Color"
          :children= BarColored
          >
        </app-layout>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  import CircularProgress from '@/components/ui-elements/progress/CircularProgress';
  import CircularColor from '@/components/ui-elements/progress/CircularColor';
  import CircularIndeterminate from '@/components/ui-elements/progress/CircularIndeterminate';
  import CircularRotate from '@/components/ui-elements/progress/CircularRotate';
  import BarIndeterminate from '@/components/ui-elements/progress/BarIndeterminate';
  import BarColored from '@/components/ui-elements/progress/BarColored';

  export default {
    data: () => ({
      CircularProgress,
      CircularColor,
      CircularIndeterminate,
      CircularRotate,
      BarIndeterminate,
      BarColored,
    }),
  };
</script>

<style lang="css">
</style>
