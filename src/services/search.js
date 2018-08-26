import HTTP from './http-request-handler';

const searchService = {
  search: searchObj => HTTP.get(searchObj.endpoint, { params: { query: searchObj.query } })
    .then(res => res.data.results)
    .catch(e => e),
};
export default searchService;
