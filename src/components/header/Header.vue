<template lang="html">
  <div>
    <v-toolbar dark app clipped-left fixed>
      <!-- Logo and Sidebar toggle icon area -->
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 260px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3 d-flex justify-content-between align-items-center">

        <span class="brand"><img :src="logo"></span>
        <v-btn flat icon color="" @click="sideBarToggle()">
          <v-icon>sort</v-icon>
        </v-btn>
      </v-toolbar-title>

      <!-- Search Box -->
      <v-text-field
        dark
        class="hidden-xs-only"
        prepend-icon="search"
        placeholder="Search"
        elevation-5
        style="max-width: 500px; min-width: 128px;box-shadow: none; background: transparent;"
        v-model="searchText"
        @keyup="search"
      >
      </v-text-field>

      <div>
        <v-select
          class="pl-3"
          placeholder="Select search type"
          :items="selectItems"
          v-model="searchType"
        >
        </v-select>
      </div>    

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
import { eventBus } from '../../main';
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
    selectItems: [
      { text: 'Contact', value: 'search' },
      { text: 'Project', value: 'project' },
    ],
    searchType: 'search',
    searchText: '',
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
    search() {
      const searchText = this.searchText.trim();
      if (searchText === '') {
        this.$store.commit('MUTATION_SET_SEARCH_STATE', false);
        this.$store.commit('MUTATION_SET_SEARCH_RESULT', []);
      } else {
        this.$store.commit('MUTATION_SET_SEARCH_RESULT', []);
        this.$store.commit('MUTATION_SET_SEARCH_STATE', true);
        const searchObj = {
          endpoint: 'search',
          query: searchText,
        };
        this.$store.dispatch('ACTION_GET_SEARCH_RESULT', searchObj);
      }
    },

    sideBarToggle() {
      eventBus.$emit('sidebartoggled');
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
