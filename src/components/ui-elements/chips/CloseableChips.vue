<template>
  <div class="text-xs-center">
    <v-chip close v-model="chip1">Closable</v-chip>

    <v-chip close v-model="chip2" color="red" text-color="white">Remove</v-chip>

    <v-chip close v-model="chip3" outline color="green">Success</v-chip>

    <v-chip close v-model="chip4" outline label color="orange">Complete</v-chip>

  </div>
</template>

<script>
  export default {
    data: () => ({
      chip1: true,
      chip2: true,
      chip3: true,
      chip4: true,
    }),

  };
</script>

<style scoped>

</style>
