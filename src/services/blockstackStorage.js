const blockstackStorage = {
  updateTagIndex: (key, value) => blockstack.getFile('my_tags.json')
      .then((currentContent) => {
        if (!currentContent) {
          blockstack.putFile('my_tags.json', JSON.stringify({ [key]: value }))
            .then((filename) => {
            });
        } else {
          const parsedCurrentContent = JSON.parse(currentContent);
          parsedCurrentContent[key] = value;
          blockstack.putFile('my_tags.json', JSON.stringify(parsedCurrentContent))
            .then((filename) => {
            });
        }
      }),
};
export default blockstackStorage;
