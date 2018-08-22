<template>
  <div>
    <v-layout flex-wrap row>
      <v-flex md6>
        <app-layout
          title="Checkbox"
          :children="CheckBox"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Radio"
          :children="RadioBox"
          >
        </app-layout>
      </v-flex>

      <v-flex md12>
        <app-layout
          title="Switches"
          :children="Switch"
          >
        </app-layout>
      </v-flex>
    </v-layout>


  </div>
</template>

<script>
  import CheckBox from './forms-components/CheckBox';
  import RadioBox from './forms-components/RadioBox';
  import Switch from './forms-components/Switch';

  export default {
    data: () => ({
      CheckBox,
      RadioBox,
      Switch,
    }),
  };
</script>

<style scoped>

</style>
