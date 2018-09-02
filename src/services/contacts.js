const contactService = {
  methods: {
    // mixin methods for updating my_contacts.json file
    updateContacts (contact, type) {
      this.$store.dispatch('ACTION_UPDATE_CONTACTS', {
        fileName: 'my_contacts.json',
        contact,
        type,
        options: { encrypt: true }
      })
    },
    // mixin methods for fetching my_contacts.json file
    getContacts () {
      this.$store.dispatch('ACTION_GET_CONTACTS', {
        fileName: 'my_contacts.json',
        options: { decrypt: true }
      })
    }
  }
}
export default contactService
