import cryptocracyServices from '@/services/cryptocracy'
import axios from 'axios'
const cryptocracyHandler = {
  state: {
    searchResult: [],
    contentData: {}
  },
  mutations: {
    MUTATION_SAVE_SEARCHED_RESULT (state, payload) {
      let modifiedData = payload.reduce((acc, item) => {
        acc.push({
          fileUrl: item[0],
          distance: item[1],
          coordinates: [item[2][1], item[2][0]]
        })
        return acc
      }, [])
      state.searchResult = modifiedData
    },
    MUTATION_SET_CONTENT_DATA (state, payload) {
      state.contentData = payload
    }
  },
  actions: {
    async ACTION_PROXIMITY_SEARCH (context, payload) {
      let res = await cryptocracyServices.proximitySearch(payload)
      context.commit('MUTATION_SAVE_SEARCHED_RESULT', res.data)
      return res
    },
    async ACTION_GET_CONTENT (context, fileUrl) {
      let res = await axios.get(fileUrl)
      context.commit('MUTATION_SET_CONTENT_DATA', res.data)
      return res
    },
    ACTION_NOTIFY_SERVER (context, fqn) {
      cryptocracyServices.notifyServer(fqn)
    }
  },
  getters: {
    getProximitySearchResult: state => state.searchResult,
    getContentData: state => state.contentData
  }
}
export default cryptocracyHandler
