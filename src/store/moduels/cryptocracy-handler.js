import cryptocracyServices from '@/services/cryptocracy'
import axios from 'axios'
const cryptocracyHandler = {
  state: {
    searchResult: [],
    contentData: {},
    quorumData: []
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
    },
    MUTATION_SET_QUORUM_DATA (state, payload) {
      let modifiedData = payload.reduce((acc, item, index) => {
        if (!(index % 2)) {
          let url = payload[index + 1].split('_')
          url.splice(0, 1)
          let createdOn = url[url.length - 1].split('.')[0]
          let contentUrl = url.join('_')
          acc.push({
            'votes': item,
            'contentUrl': contentUrl,
            'createdOn': createdOn
          })
        }
        return acc
      }, [])
      state.quorumData = modifiedData
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
    async ACTION_GET_QUORUM_DATA (context, query) {
      let res = await cryptocracyServices.getQuorumContent(query)
      context.commit('MUTATION_SET_QUORUM_DATA', res)
      return res
    },
    ACTION_NOTIFY_SERVER (context, fqn) {
      cryptocracyServices.notifyServer(fqn)
    }
  },
  getters: {
    getProximitySearchResult: state => state.searchResult,
    getContentData: state => state.contentData,
    getQuorumData: state => state.quorumData
  }
}
export default cryptocracyHandler
