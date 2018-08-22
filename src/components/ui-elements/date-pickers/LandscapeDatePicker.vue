<template>
  <div>
    <v-date-picker v-model="picker" landscape="landscape"
      color="green lighten-1" header-color="primary" ></v-date-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      picker: null,
    }),

  };
</script>

<style scoped>

</style>
