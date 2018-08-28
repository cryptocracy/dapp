import storageServive from '@/services/blockstack-storage';
import { isArray } from 'util';

const storageHandler = {
  state: {
    contacts: [],
  },
  mutations: {
    MUTATION_SET_CONTACTS(state, payload) {
      state.contacts = payload || [];
    },
    MUTATION_UPDATE_CONTACTS(state, payload) {
      if (payload.type === 'addition') {
        if (isArray(state.contacts)) {
          state.contacts.push(payload.contact);
        } else {
          state.contacts = [payload.contact];
        }
      } else {
        state.contacts.forEach((item, index) => {
          if (item.fullyQualifiedName === payload.contact.fullyQualifiedName) {
            state.contacts.splice(index, 1);
          }
        });
      }
    },
  },
  actions: {
    async ACTION_GET_CONTACTS(context, payload) {
      const contacts = await storageServive.getFile(payload);
      context.commit('MUTATION_SET_CONTACTS', contacts);
    },
    ACTION_UPDATE_CONTACTS(context, payload) {
      context.commit('MUTATION_UPDATE_CONTACTS', payload);
      storageServive.putFile({
        fileName: payload.fileName,
        data: context.state.contacts,
        options: payload.options,
      });
    },
  },
  getters: {
    getContacts: state => state.contacts,
  },
};
export default storageHandler;
