import Vue from 'vue'
import Vuex from 'vuex'
import notifications from './moduels/notifications'
import teams from './moduels/teams'
import searchHandler from './moduels/search-handler'
import contactsHandler from './moduels/contacts-handler'
import userProfileData from './moduels/profileData'

Vue.use(Vuex)

// All store data should place inside state as a central store
const stateObject = {
  notifications,
  teams,
  sidebarOpen: true,
  isLoading: false,
  pay_to: {},
  hubUrl: ''
}

export default new Vuex.Store({
  state: stateObject,
  modules: {
    userProfileData,
    searchHandler,
    contactsHandler
  },
  mutations: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    toggleLoading: (state, payload) => {
      state.isLoading = payload || !state.isLoading
    }
  },
  getters: {
    isLoading: state => state.isLoading
  }
})
