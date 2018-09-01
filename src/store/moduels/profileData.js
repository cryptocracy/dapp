// import { mutations, actions, getters, state } from "module";
const userProfileData = {
  state: {
    profileData: {},
    contactUserData: {}
  },
  mutations: {
    MUTATION_SET_USER_PROFILE_DATA (state, payload) {
      state.profileData = payload
    },
    MUTATION_SET_CONTACT_USER_PROFILE_DATA (state, payload) {
      state.contactUserData = payload
    }
  },
  getters: {
    getProfileData: state => state.profileData,
    getContactData: state => state.contactUserData
  }
}
export default userProfileData
