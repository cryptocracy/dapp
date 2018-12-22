import transactionService from '@/services/transactions'
const transactionsHandler = {
  state: {
    sentAmounts: [],
    receivedAmounts: [],
    sentDates: [],
    receivedDates: [],
    showGraph: false
  },
  mutations: {
    MUTATION_SET_TRANSACTIONS_DATA (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    MUTATION_CHANGE_GRAPH_STATE (state, payload) {
      state.showGraph = payload
    }
  },
  actions: {
    async ACTION_GET_TRANSACTIONS_DATA (context, payload) {
      let a = await transactionService.getTransactionsData()
      context.commit('MUTATION_SET_TRANSACTIONS_DATA', a)
      context.commit('MUTATION_CHANGE_GRAPH_STATE', true)
      return a
    }
  },
  getters: {
    getSentAmounts: state => state.sentAmounts,
    getReceivedAmounts: state => state.receivedAmounts,
    getSentDates: state => state.sentDates,
    getReceivedDates: state => state.receivedDates,
    showGraph: state => state.showGraph
  }
}
export default transactionsHandler
