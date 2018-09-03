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
  },
  updateTagIndex: (key, value) => window.blockstack.getFile('my_tags.json')
    .then((currentContent) => {
      if (!currentContent) {
        window.blockstack.putFile('my_tags.json', JSON.stringify({[key]: value}))
      } else {
        const parsedCurrentContent = JSON.parse(currentContent)
        parsedCurrentContent[key] = value
        window.blockstack.putFile('my_tags.json', JSON.stringify(parsedCurrentContent))
      }
    })
}
export default storageService
