<template>
  <div>
    <v-progress-circular :value="40"></v-progress-circular>
    <v-progress-circular :value="20"></v-progress-circular>
    <v-progress-circular :value="80"></v-progress-circular>
    <v-progress-circular :value="60"></v-progress-circular>
    <v-progress-circular :value="100"></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: ['value']

}
</script>

<style scoped>
  div {
    text-align: center;
  }
  .progress-circular {
    margin: 10px;
  }

</style>
