import searchService from '@/services/search'

const searchHandler = {
  state: {
    searchResult: [],
    isSearching: false,
    isResolved: true
  },
  mutations: {
    MUTATION_SET_SEARCH_RESULT (state, payload) {
      state.searchResult = payload
    },
    MUTATION_SET_SEARCH_STATE (state, payload) {
      state.isSearching = payload
    },
    MUTATION_SET_RESOLVED_STATE (state, payload) {
      state.isResolved = payload
    }
  },
  actions: {
    async ACTION_GET_SEARCH_RESULT (context, searchObj) {
      context.commit('MUTATION_SET_RESOLVED_STATE', false)
      const searchResult = await searchService.search(searchObj)
      context.commit('MUTATION_SET_SEARCH_RESULT', searchResult)
      context.commit('MUTATION_SET_RESOLVED_STATE', true)
      return searchResult
    }
  },
  getters: {
    getSearchResult: state => state.searchResult,
    isSearching: state => state.isSearching,
    isResolved: state => state.isResolved
  }
}
export default searchHandler
