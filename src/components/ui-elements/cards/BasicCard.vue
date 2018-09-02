<template>
  <div>
    <v-card>
      <v-card-media :src="cardImage" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import cardImage from '../../../assets/img/card-iamge.jpg'

export default {
  data: () => ({
    cardImage
  })

}
</script>

<style scoped>

</style>
