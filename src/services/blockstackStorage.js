const blockstackStorage = {
  addToIndex: (indexName, key, value) => blockstack.getFile(indexName)
      .then((currentContent) => {
        if (!currentContent) {
          blockstack.putFile(indexName, JSON.stringify({ [key]: value }))
            .then((filename) => {
            });
        } else {
          const parsedCurrentContent = JSON.parse(currentContent);
          parsedCurrentContent[key] = value;
          blockstack.putFile(indexName, JSON.stringify(parsedCurrentContent))
            .then((filename) => {
            });
        }
      }),
};
export default blockstackStorage;
