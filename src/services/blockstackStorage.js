const blockstackStorage = {
  addToIndex: (indexName, key, value) => window.blockstack.getFile(indexName)
    .then((currentContent) => {
      if (!currentContent) {
        window.blockstack.putFile(indexName, JSON.stringify({ [key]: value }))
          .then(() => {
          })
      } else {
        const parsedCurrentContent = JSON.parse(currentContent)
        parsedCurrentContent[key] = value
        window.blockstack.putFile(indexName, JSON.stringify(parsedCurrentContent))
          .then(() => {
          })
      }
    })
}
export default blockstackStorage
