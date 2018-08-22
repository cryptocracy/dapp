<template>
  <div>
    <div class="badge-wrapper">
      <!--Number badge -->
      <v-badge left>
        <span slot="badge">6</span>
        <v-icon large color="grey lighten-1">shopping_cart</v-icon>
      </v-badge>

      <v-badge color="red">
        <span slot="badge">!</span>
        <v-icon large color="grey">mail</v-icon>
      </v-badge>

      <!--Icon badge -->
      <v-badge overlay left color="purple" overlap>
        <v-icon slot="badge" dark>done</v-icon>
        <v-icon
          large
          color="grey lighten-1"
          >
          account_circle
        </v-icon>
      </v-badge>

      <v-badge overlap color="orange">
        <v-icon slot="badge" dark>notifications</v-icon>
        <v-icon
          large
          color="grey darken-1"
          >
          account_box
        </v-icon>
      </v-badge>


      <!--Inline badge -->
      <v-badge left>
        <span slot="badge">2</span>
        <span>Examples</span>
      </v-badge>
      <v-badge color="green">
        <v-icon slot="badge" dark>list</v-icon>
        <span>Lists</span>
      </v-badge>



    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style scoped>
  .badge-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .badge {
    margin-right: 50px;
    margin-bottom: 20px;
  }

</style>
