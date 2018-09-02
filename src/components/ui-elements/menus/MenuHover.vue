<template>
  <div>
    <v-menu open-on-hover top offset-y>
      <v-btn color="primary" dark slot="activator">Hover Menu</v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="dummyFunction">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
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

</style>
