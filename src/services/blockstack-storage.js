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
  updateIndex: (jsonName, data, slice = false) => window.blockstack.getFile(jsonName)
    .then((currentContent) => {
      let [key, value] = data
      if (!currentContent) {
        window.blockstack.putFile(jsonName, JSON.stringify({ [key]: value }))
      } else {
        const parsedCurrentContent = JSON.parse(currentContent)
        if (slice) {
          delete parsedCurrentContent[key]
        } else {
          parsedCurrentContent[key] = value
        }
        window.blockstack.putFile(jsonName, JSON.stringify(parsedCurrentContent))
      }
    }),
  updateTagIndex: (key, value) => storageService.updateIndex('my_tags.json', [key, value]),
  updateImageIndex: (key, value) => storageService.updateIndex('my_images.json', [key, value]),
  updateMarkerIndex: (key, value) => storageService.updateIndex('my_markers.json', [key, value]),
  updateWalletIndex: (key, value) => storageService.updateIndex('my_wallet.json', [key, value]),
  updateFavoriteTagIndex: (name, tagTitle) => storageService.updateIndex('my_fav_tags.json', [name, tagTitle]),
  reduceFavoriteTagIndex: (name, tagTitle) => storageService.updateIndex('my_fav_tags.json', [name, tagTitle], true),
  updateFavoriteImageIndex: (name, tagTitle) => storageService.updateIndex('my_fav_images.json', [name, tagTitle]),
  reduceFavoriteImageIndex: (name, tagTitle) => storageService.updateIndex('my_fav_images.json', [name, tagTitle], true),
  updateFavoriteMarkerIndex: (name, tagTitle) => storageService.updateIndex('my_fav_markers.json', [name, tagTitle]),
  reduceFavoriteMarkerIndex: (name, tagTitle) => storageService.updateIndex('my_fav_markers.json', [name, tagTitle], true)
}
export default storageService
