<template>
  <div>
    <v-list subheader>
      <v-subheader>Recent chat</v-subheader>
      <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="dummyFunction">
        <v-list-tile-avatar>
          <img v-bind:src="item.avatar"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon v-bind:color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>Previous chats</v-subheader>
      <v-list-tile avatar v-for="item in items2" v-bind:key="item.title" @click="dummyFunction">
        <v-list-tile-avatar>
          <img v-bind:src="item.avatar"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </div>
</template>

<script>
import avatar1 from '../../../assets/img/user1.jpg'
import avatar2 from '../../../assets/img/user2.jpg'
import avatar3 from '../../../assets/img/user3.jpg'
import avatar4 from '../../../assets/img/user4.jpg'

export default {
  data: () => ({
    items: [
      { active: true, title: 'Jason Oner', avatar: avatar1 },
      { active: true, title: 'Ranee Carlson', avatar: avatar2 },
      { title: 'Cindy Baker', avatar: avatar3 },
      { title: 'Ali Connors', avatar: avatar4 }
    ],
    items2: [
      { title: 'Travis Howard', avatar: avatar1 }
    ]
  })
}
</script>

<style scoped>

</style>
