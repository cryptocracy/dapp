import cryptocracyServices from '@/services/cryptocracy'
const cryptocracyHandler = {
  state: {
    searchResult: []
  },
  mutations: {
    MUTATION_SAVE_SEARCHED_RESULT (state, payload) {
      let modifiedData = payload.reduce((acc, item) => {
        acc.push({
          fileUrl: item[0],
          distance: item[1],
          coordinates: {
            lat: item[2][1],
            lng: item[2][0]
          }
        })
        return acc
      }, [])
      state.searchResult = modifiedData
    }
  },
  actions: {
    async ACTION_PROXIMITY_SEARCH (context, payload) {
      let res = await cryptocracyServices.proximitySearch(payload)
      context.commit('MUTATION_SAVE_SEARCHED_RESULT', res.data)
      return res
    }
  },
  getters: {
    getProximitySearchResult: state => state.searchResult
  }
}
export default cryptocracyHandler
