<template>
  <div>
    <!-- Basic nav buton -->
    <div class="navigation-wrapper">
      <v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
        <v-btn flat color="teal" value="recent">
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn flat color="teal" value="favorites">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn flat color="teal" value="nearby">
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </div>

    <!-- Multi color navigation -->
    <div class="navigation-wrapper2">
      <v-bottom-nav
        absolute
        shift
        :value="true"
        :active.sync="e2"
        :color="computedColor"
        >
        <v-btn dark>
          <span>Video</span>
          <v-icon>ondemand_video</v-icon>
        </v-btn>
        <v-btn dark>
          <span>Music</span>
          <v-icon>music_note</v-icon>
        </v-btn>
        <v-btn dark>
          <span>Book</span>
          <v-icon>book</v-icon>
        </v-btn>
        <v-btn dark>
          <span>Image</span>
          <v-icon>image</v-icon>
        </v-btn>
      </v-bottom-nav>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      e1: 'recent',
      e2: 3,
    }),

    computed: {
      computedColor() {
        switch (this.e2) {
          case 0:
            return 'blue-grey';
          case 1:
            return 'teal';
          case 2:
            return 'brown';
          case 4:
            return 'brown lighten-1';
          default:
            return 'blue-grey';
        }
      },
    },

  };
</script>

<style scoped>
  .navigation-wrapper {
    position: relative;
    height: 60px;
    margin-bottom: 30px;
  }
  .navigation-wrapper2 {
    position: relative;
    height: 60px;
  }


</style>
