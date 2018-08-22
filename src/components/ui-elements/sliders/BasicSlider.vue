<template>
  <div>
    <v-slider v-model="value" thumb-label ></v-slider>
  </div>
</template>

<script>
  export default {
    data: () => ({
      value: 0,
    }),
  };
</script>

<style scoped>

</style>
