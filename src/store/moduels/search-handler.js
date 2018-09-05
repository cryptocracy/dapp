import searchService from '@/services/search'

const searchHandler = {
  state: {
    searchResult: [],
    isSearching: false,
    isRedirected: false,
    isResolved: true,
    userProfileData: {}
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
    },
    MUTATION_SET_REDIRECTION_STATE (state, payload) {
      state.isRedirected = payload
    },
    MUTATION_SET_USER (state, payload) {
      state.userProfileData = payload
    }
  },
  actions: {
    async ACTION_GET_SEARCH_RESULT (context, searchObj) {
      // mutation for showing loader while searching
      context.commit('MUTATION_SET_RESOLVED_STATE', false)
      const searchResult = await searchService.search(searchObj)
      // setting search state true when user comes on profile page directly via URL
      // and the Id he entered in URL giving multiple results
      // with search state active, multiple search-results are going to render
      // and user can seelct one of them to view their profiles
      if (searchResult.length > 1 && !searchObj.isAbsolute) {
        context.commit('MUTATION_SET_SEARCH_STATE', true)
      }
      // again this is when user user comes on profile page directly via URL
      // and to show the profile of user when only single result is returned from API
      context.commit('MUTATION_SET_USER', searchResult[0] || {})
      context.commit('MUTATION_SET_SEARCH_RESULT', searchResult)
      // changing resolved state to stop loader
      context.commit('MUTATION_SET_RESOLVED_STATE', true)
      return searchResult
    }
    // action to search specific user from /users endpoint (do not delete, will need it in near future)
    // async ACTION_GET_USER (context, searchObj) {
    //   context.commit('MUTATION_SET_RESOLVED_STATE', false)
    //   const user = await searchService.searchUser(searchObj)
    //   context.commit('MUTATION_SET_USER', user)
    //   context.commit('MUTATION_SET_RESOLVED_STATE', true)
    //   return user
    // }
  },
  getters: {
    getSearchResult: state => state.searchResult,
    isSearching: state => state.isSearching,
    isResolved: state => state.isResolved,
    isRedirected: state => state.isRedirected,
    getUserProfileData: state => state.userProfileData
  }
}
export default searchHandler
