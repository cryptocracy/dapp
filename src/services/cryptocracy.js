import Axios from 'axios'

const cryptocracyServices = {
  proximitySearch: (query) => {
    return Axios.get('https://search.cryptocracy.io/souq/search/proximity', { params: {...query} })
  },
  searchTags: async (query) => {
    let res = await Axios.get('https://search.cryptocracy.io/souq/search/tags', { params: {...query} })
    return res.data
  }
}
export default cryptocracyServices
