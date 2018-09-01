<template>
  <div>
    <v-menu offset-y v-model="showMenu" absolute full-width>
      <v-card class="portrait" :img="cardImage" height="300px" slot="activator"></v-card>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="dummyFunction">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import cardImage from '../../../assets/img/banner.jpg'

export default {
  data: () => ({
    cardImage,
    showMenu: false,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  })

}
</script>

<style scoped>
  .menu {
    max-width: 600px
  }

</style>
