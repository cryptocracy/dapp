<template>
  <div>
    <div class="text-xs-center">
      <v-bottom-sheet v-model="sheet">
        <v-btn slot="activator" color="purple" dark>Click me</v-btn>
        <v-list>
          <v-subheader>Open in</v-subheader>
          <v-list-tile
            v-for="tile in tiles"
            :key="tile.title"
            @click="sheet = false"
            >
            <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-bottom-sheet>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    tiles: [
      { title: 'Keep' },
      { title: 'Inbox' },
      { title: 'Hangouts' },
      { title: 'Messenger' },
      { title: 'Google+' }
    ]
  })

}
</script>

<style scoped>
ul {
  margin-bottom: 0;
}

</style>
