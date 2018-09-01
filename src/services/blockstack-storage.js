const storageService = {
  putFile: (dataObj) => {
    const { fileName, data, options } = dataObj
    window.blockstack.putFile(fileName, JSON.stringify(data), options)
  },
  getFile: (dataObj) => {
    const { fileName, options } = dataObj
    return window.blockstack.getFile(fileName, options).then(res => JSON.parse(res))
  }
}
export default storageService
