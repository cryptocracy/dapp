<template>
  <div>
    <v-container fluid >
      <v-layout row wrap>
        <v-flex
          xs4
          v-for="n in 9"
          :key="n"
          >
          <v-card flat tile>
            <v-card-media
              :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
              height="150px"
              >
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .card--flat {
    margin-bottom: 30px;
  }

</style>
