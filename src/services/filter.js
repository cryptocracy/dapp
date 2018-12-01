const filterService = {
  methods: {
    // mixin methods for updating my_contacts.json file
    getHubUrl (profileData) {
      if (profileData && profileData.hasOwnProperty('profile') && typeof profileData.profile.apps === 'object') {
        return profileData.profile.apps['https://dapp_cryptocracy_io']
      } else return null
    },
    // // mixin methods for fetching my_contacts.json file
    // getContacts () {
    //   this.$store.dispatch('ACTION_GET_CONTACTS', {
    //     fileName: 'my_contacts.json',
    //     options: { decrypt: true }
    //   })
    // }
  }
}
export default filterService
