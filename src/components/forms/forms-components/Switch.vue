<template>
  <div>
    <v-switch v-bind:label="`Switch 1: ${ex11.toString()}`" v-model="ex11"></v-switch>
    <v-switch v-bind:label="`Switch 2: ${ex12.toString()}`" v-model="ex12"></v-switch>

    <v-subheader v-text="'Switch state'"></v-subheader>

    <v-layout row wrap class="dark--text">
      <v-flex xs6>on</v-flex>
      <v-flex xs6>off</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-switch value input-value="true" ></v-switch>
      </v-flex>
      <v-flex xs6>
        <v-switch ></v-switch>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="dark--text">
      <v-flex xs6>on disabled</v-flex>
      <v-flex xs6>off disabled</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-switch value input-value="true" disabled></v-switch>
      </v-flex>
      <v-flex xs6>
        <v-switch disabled></v-switch>
      </v-flex>
    </v-layout>

    <v-subheader v-text="'Colored'"></v-subheader>

    <v-layout row wrap>
      <v-flex xs12 sm4 md4>
        <v-switch label="red"
          v-model="ex15"
          color="red"
          value="red"
          hide-details></v-switch>
        <v-switch label="red darken-3"
          v-model="ex15"
          color="red darken-3"
          value="red darken-3"
          hide-details></v-switch>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-switch label="indigo"
          v-model="ex15"
          color="indigo"
          value="indigo"
          hide-details></v-switch>
        <v-switch label="indigo darken-3"
          v-model="ex15"
          color="indigo darken-3"
          value="indigo darken-3"
          hide-details></v-switch>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-switch label="orange"
          v-model="ex15"
          color="orange"
          value="orange"
          hide-details></v-switch>
        <v-switch label="orange darken-3"
          v-model="ex15"
          color="orange darken-3"
          value="orange darken-3"
          hide-details></v-switch>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12 sm4 md4>
        <v-switch label="primary"
          v-model="ex15"
          color="primary"
          value="primary"
          hide-details></v-switch>
        <v-switch label="secondary"
          v-model="ex15"
          color="secondary"
          value="secondary"
          hide-details></v-switch>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-switch label="success"
          v-model="ex15"
          color="success"
          value="success"
          hide-details></v-switch>
        <v-switch label="info"
          v-model="ex15"
          color="info"
          value="info"
          hide-details></v-switch>
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-switch label="warning"
          v-model="ex15"
          color="warning"
          value="warning"
          hide-details></v-switch>
        <v-switch label="error"
          v-model="ex15"
          color="error"
          value="error"
          hide-details></v-switch>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  export default {
    data: () => ({
      ex11: true,
      ex12: false,
      ex13: true,
      ex14: false,
      ex15: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error',
        'red darken-3', 'indigo darken-3', 'orange darken-3'],
    }),

  };
</script>

<style scoped>

</style>
