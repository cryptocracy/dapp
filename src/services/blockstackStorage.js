const blockstackStorage = {
  updateTagIndex: (key, value) => window.blockstack.getFile('my_tags.json')
    .then((currentContent) => {
      if (!currentContent) {
        window.blockstack.putFile('my_tags.json', JSON.stringify({[key]: value}))
          .then((filename) => {
          })
      } else {
        const parsedCurrentContent = JSON.parse(currentContent)
        parsedCurrentContent[key] = value
        window.blockstack.putFile('my_tags.json', JSON.stringify(parsedCurrentContent))
          .then((filename) => {
          })
      }
    })
}
export default blockstackStorage
