import storageServive from '@/services/blockstack-storage'

const storageHandler = {
  state: {
    contacts: []
  },
  mutations: {
    MUTATION_SET_CONTACTS (state, payload) {
      state.contacts = payload || []
    },
    // mutation for handling addition and deletion of contacts from state.contacts
    // for real time data changes
    MUTATION_UPDATE_CONTACTS (state, payload) {
      if (payload.type === 'addition') {
        // if contacts is already an array then pushing the changes
        // else creating an array with a new contact
        if (Array.isArray(state.contacts)) {
          state.contacts.push(payload.contact)
        } else {
          state.contacts = [payload.contact]
        }
      } else {
        // case for deletion of array
        state.contacts.forEach((item, index) => {
          if (item.fullyQualifiedName === payload.contact.fullyQualifiedName) {
            state.contacts.splice(index, 1)
          }
        })
      }
    }
  },
  actions: {
    // fetching my_contacts.json file
    async ACTION_GET_CONTACTS (context, payload) {
      const contacts = await storageServive.getFile(payload)
      context.commit('MUTATION_SET_CONTACTS', contacts)
    },
    // updating concats in my_contacts.json file
    ACTION_UPDATE_CONTACTS (context, payload) {
      // updating contacts list in state.contacts and my_contacts.json file
      context.commit('MUTATION_UPDATE_CONTACTS', payload)
      storageServive.putFile({
        fileName: payload.fileName,
        data: context.state.contacts,
        options: payload.options
      })
    }
  },
  getters: {
    getContacts: state => state.contacts
  }
}
export default storageHandler
