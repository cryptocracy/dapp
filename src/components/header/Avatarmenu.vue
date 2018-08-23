<template lang="html">
  <v-menu bottom left min-width=200>
    <v-btn icon slot="activator" dark>
      <v-avatar size="32px">
        <img :src="profileAvatar" alt="avatar">
      </v-avatar>
    </v-btn>
    <v-list>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>face</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>color_lens</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Theme</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>BNS</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="signOut">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>

</template>

<script>
import profileAvatar from '../../assets/img/user12.jpg';

export default {
  data: () => ({
    profileAvatar,
    blockstack: window.blockstack,
  }),
  methods: {
    signOut() {
      this.blockstack.signUserOut(window.location.href);
      window.location.href = '/';
    },
  },
};
</script>
</script>

<style lang="css">
</style>
