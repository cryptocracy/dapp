<template>
  <v-app light>
    <div id="app">
      <login v-if="!blockstack.isUserSignedIn()"></login>
      <div v-else>
        <app-header></app-header>
        <app-sidebar/>
        <div :class="isSidebarOpen">
          <transition name="slide-fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
        <v-footer class="pa-3" >
          <v-spacer></v-spacer>
          <div>Made with love by Ty {{ new Date().getFullYear() }}</div>
        </v-footer>
      </div>
      
    </div>
  </v-app>
</template>

<script>
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/other-pages/login/Login';

export default {
  components: {
    'app-header': Header,
    'app-sidebar': Sidebar,
    login: Login,
  },
  name: 'app',

  data: () => ({
    windowWidth: 0,
    blockstack: window.blockstack,
  }),

  methods: {
    /**
     * Get window width to toggle sidebar state value
     *
     * @type {function}
     * @return {Boolean} true / false based on sidebarOpen Data
     */
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
      if (this.windowWidth < 991) {
        this.$store.state.sidebarOpen = false;
      } else {
        this.$store.state.sidebarOpen = true;
      }
    },
  },

  computed: {
    /**
    * Toggle sidebar
    *
    * @type {function}
    * @return {Boolean} true / false based on sidebarOpen Data
    */
    isSidebarOpen() {
      return {
        'main-wrapper': true,
        'sidebar-open': this.$store.state.sidebarOpen,
      };
    },
  },

  mounted() {
    const blockstack = this.blockstack;
    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData();
      this.user = new blockstack.Person(this.userData.profile);
      this.user.username = this.userData.username;
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
      .then(() => {
        window.location = window.location.origin;
      });
    }
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
};
</script>

<style media="screen">

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;

  }
  

</style>
