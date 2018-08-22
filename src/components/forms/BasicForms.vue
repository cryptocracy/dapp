<template>
  <div>
    <v-layout flex-wrap row>
      <v-flex md6>
        <app-layout
          title="Text fields"
          :children="TextFields"
          >
        </app-layout>
      </v-flex>
      <v-flex md6>
        <app-layout
          title="Select fields"
          :children="SelectFields"
          >
        </app-layout>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import TextFields from './forms-components/TextFields';
  import SelectFields from './forms-components/SelectFields';

  export default {
    data: () => ({
      TextFields,
      SelectFields,
    }),

  };
</script>

<style scoped>

</style>
