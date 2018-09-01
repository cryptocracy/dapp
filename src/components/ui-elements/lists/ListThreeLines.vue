<template>
  <div>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" v-text="item.header" :key="index"></v-subheader>
        <v-divider v-else-if="item.divider" v-bind:inset="item.inset" :key="index"></v-divider>
        <v-list-tile avatar v-else v-bind:key="item.title" @click="dummyFunction">
          <v-list-tile-avatar>
            <img v-bind:src="item.avatar"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import avatar1 from '../../../assets/img/user2.jpg'
import avatar2 from '../../../assets/img/user3.jpg'
import avatar3 from '../../../assets/img/user4.jpg'

export default {
  data: () => ({
    items: [
      { header: 'Today' },
      { avatar: avatar1, title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
      { divider: true, inset: true },
      { avatar: avatar2, title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
      { divider: true, inset: true },
      { avatar: avatar3, title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
      { divider: true, inset: true },
      { avatar: avatar2, title: 'Birthday gift', subtitle: "<span class='grey--text text--darken-2'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?" },
      { divider: true, inset: true },
      { avatar: avatar1, title: 'Recipe to try', subtitle: "<span class='grey--text text--darken-2'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
    ]
  })

}
</script>

<style scoped>
  hr {
    margin-top: 0;
    margin-bottom: 0;
  }

</style>
