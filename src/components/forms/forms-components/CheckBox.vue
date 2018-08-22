<template>
  <div>
    <v-checkbox :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1" light></v-checkbox>
    <v-checkbox :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2" light></v-checkbox>
    <v-checkbox input-value="true" value disabled label="Disabled"></v-checkbox>
    <v-checkbox value indeterminate label="Indeterminate"></v-checkbox>

    <v-subheader v-text="'Colored'"></v-subheader>
    <v-layout wrap>
      <v-flex sm6 xs12>
        <v-checkbox label="red"
          v-model="ex4"
          color="red"
          value="red"
          hide-details>
        </v-checkbox>
      </v-flex>
      <v-flex sm6 xs12>
        <v-checkbox label="indigo"
          v-model="ex4"
          color="indigo"
          value="indigo"
          hide-details>
        </v-checkbox>
      </v-flex>
      <v-flex sm6 xs12>
        <v-checkbox label="orange"
          v-model="ex4"
          color="orange"
          value="orange"
          hide-details>
        </v-checkbox>
      </v-flex>

      <v-flex sm6 xs12>
        <v-checkbox label="primary"
          v-model="ex4"
          color="primary"
          value="primary"
          hide-details>
        </v-checkbox>
      </v-flex>
      <v-flex sm6 xs12>
        <v-checkbox label="success"
          v-model="ex4"
          color="success"
          value="success"
          hide-details>
        </v-checkbox>
      </v-flex>
      <v-flex sm6 xs12>
        <v-checkbox label="info"
          v-model="ex4"
          color="info"
          value="info"
          hide-details>
        </v-checkbox>
      </v-flex>
      <v-flex sm6 xs12>
        <v-checkbox label="warning"
          v-model="ex4"
          color="warning"
          value="warning"
          hide-details>
        </v-checkbox>
      </v-flex>

      <v-flex sm6 xs12>
        <v-checkbox label="error"
          v-model="ex4"
          color="error"
          value="error"
          hide-details>
        </v-checkbox>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      ex1: true,
      ex2: false,
      ex3: true,
      ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error'],
    }),

  };
</script>

<style scoped>

</style>
