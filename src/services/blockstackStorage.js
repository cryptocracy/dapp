const blockstackStorage = {
  addToIndex: (indexName, key, value) => blockstack.getFile(indexName)
      .then((currentContent) => {
        if (!currentContent) {
          blockstack.putFile(indexName, JSON.stringify({ [key]: value }))
            .then((filename) => {
              console.log("index file created " + filename)
            });
        } else {
          let parsedCurrentContent = JSON.parse(currentContent);
          parsedCurrentContent[key] = value;
          blockstack.putFile(indexName, JSON.stringify(parsedCurrentContent))
            .then((filename) => {
              console.log("index file updated " + filename)
            });
        }
      }),
};
export default blockstackStorage;
