import Vue from 'vue';
import Vuex from 'vuex';
import notifications from './moduels/notifications';
import productsTable from './moduels/productsTable';
import products from './moduels/products';
import teams from './moduels/teams';
import services from './moduels/services';
import searchHandler from './moduels/search-handler';
import blog from './moduels/blog';
import userProfileData from './moduels/profileData';

Vue.use(Vuex);

// All store data should place inside state as a central store
const stateObject = {
  notifications,
  productsTable,
  products,
  teams,
  services,
  blog,
  sidebarOpen: true,
};

export default new Vuex.Store({
  state: stateObject,
  modules: {
    userProfileData,
    searchHandler,
  },
  mutations: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});
