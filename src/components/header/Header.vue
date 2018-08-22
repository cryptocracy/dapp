<template lang="html">
  <div>
    <v-toolbar dark app clipped-left fixed>
      <!-- Logo and Sidebar toggle icon area -->
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 260px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3 d-flex justify-content-between align-items-center">

        <span class="brand"><img :src="logo"></span>
        <v-btn flat icon color="" @click.stop="sideBarToggle()">
          <v-icon>sort</v-icon>
        </v-btn>
      </v-toolbar-title>

      <!-- Search Box -->
      <v-text-field
        dark
        solo
        class="hidden-xs-only"
        prepend-icon="search"
        placeholder="Search"
        elevation-0
        style="max-width: 500px; min-width: 128px;box-shadow: none; background: transparent;"
      >
      </v-text-field>

      <!-- Header right side notification and progile menu -->
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon @click.stop="showNotification">
          <v-icon>notifications</v-icon>
        </v-btn>
        <app-avatar-menu></app-avatar-menu>
      </div>
    </v-toolbar>

    <!-- Notification drawer component show hide div -->
    <div :class="[toggleNotification ? 'toggle' : '', 'slide-content']">
      <app-notification></app-notification>
    </div>
  </div>
</template>

<script>
import Notifications from '../notifications/Notifications';
import AvatarMenu from './Avatarmenu';
import logo from '../../assets/img/logo.svg';

export default {
  components: {
    'app-notification': Notifications,
    'app-avatar-menu': AvatarMenu,
  },

  data: () => ({
    toggleNotification: false,
    logo,
  }),

  methods: {
    /**
    * Notification Toggle
    *
    * @type {function}
    * @return {Boolean} true / false based on toggleNotification Data
    */
    showNotification() {
      this.toggleNotification = !this.toggleNotification;
    },

    sideBarToggle() {
      this.$store.commit('toggleSidebar');
    },
  },
};
</script>

<style lang="css" scoped>
.toolbar {
  background: linear-gradient(to right, #1ebea5 , #32e8a5);
  box-shadow: 0 6px 25px 0 rgba(38, 50, 56, 0.2);
}

</style>
