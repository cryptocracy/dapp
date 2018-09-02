const storageService = {
  // method for creation/updation of file in GAIA storage
  putFile: (dataObj) => {
    const { fileName, data, options } = dataObj
    window.blockstack.putFile(fileName, JSON.stringify(data), options)
  },
  // method for fetching data from GAIA storage
  getFile: (dataObj) => {
    const { fileName, options } = dataObj
    return window.blockstack.getFile(fileName, options).then(res => JSON.parse(res))
  }
}
export default storageService
