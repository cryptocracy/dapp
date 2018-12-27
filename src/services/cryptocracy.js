import Axios from 'axios'

const cryptocracyServices = {
  proximitySearch: (query) => {
    return Axios.get('https://search.cryptocracy.io/souq/search/proximity', { params: {...query} })
  }
}
export default cryptocracyServices
