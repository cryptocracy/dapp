<template lang="html">
  <div>
    <v-flex>
      <p>Flat Icon</p>
      <v-btn flat icon color="pink">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat icon color="indigo">
        <v-icon>star</v-icon>
      </v-btn>
      <v-btn flat icon color="green">
        <v-icon>cached</v-icon>
      </v-btn>
      <v-btn flat icon color="deep-orange">
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn flat icon disabled color="deep-orange">
        <v-icon>thumb_up</v-icon>
      </v-btn>
    </v-flex>

    <v-flex>
      <p>Floating Icon</p>
      <v-btn fab dark small color="primary">
        <v-icon dark>remove</v-icon>
      </v-btn>
      <v-btn fab dark small color="pink">
        <v-icon dark>favorite</v-icon>
      </v-btn>
      <v-btn fab dark color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-btn fab dark color="teal">
        <v-icon dark>list</v-icon>
      </v-btn>
      <v-btn fab dark large color="purple">
        <v-icon dark>android</v-icon>
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="css">
</style>
