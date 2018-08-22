<template>
  <div>
    <v-radio-group v-model="ex8" :mandatory="false">
      <v-radio label="Radio 1" value="radio-1"></v-radio>
      <v-radio label="Radio 2" value="radio-2"></v-radio>
    </v-radio-group>

    <v-subheader v-text="'Colored'"></v-subheader>
    <v-layout wrap>
      <v-flex md6>
        <v-radio-group v-model="ex7" column>
          <v-radio label="red"
            color="red"
            value="red"></v-radio>
          <v-radio label="red darken-3"
            color="red darken-3"
            value="red darken-3"></v-radio>
          <v-radio label="indigo"
            color="indigo"
            value="indigo"></v-radio>
          <v-radio label="indigo darken-3"
            color="indigo darken-3"
            value="indigo darken-3"></v-radio>
          <v-radio label="orange"
            color="orange"
            value="orange"></v-radio>
          <v-radio label="orange darken-3"
            color="orange darken-3"
            value="orange darken-3"></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex md6>
        <v-radio-group v-model="ex8" column>
          <v-radio label="primary"
            color="primary"
            value="primary"></v-radio>
          <v-radio label="secondary"
            color="secondary"
            value="secondary"></v-radio>
          <v-radio label="success"
            color="success"
            value="success"></v-radio>
          <v-radio label="info"
            color="info"
            value="info"></v-radio>
          <v-radio label="warning"
            color="warning"
            value="warning"></v-radio>
          <v-radio label="error"
            color="error"
            value="error"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>



  </div>
</template>

<script>
  export default {
    data: () => ({
      ex8: 'radio-1',
      ex9: 'radio-3',
      ex7: 'red',
      ex6: 'primary',
    }),

  };
</script>

<style scoped>

</style>
