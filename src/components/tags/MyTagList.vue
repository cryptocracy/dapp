<template>
  <tag-list
    :tagsArray='tagsArray'
    owned
  />
</template>

<script>
import TagList from './TagList'

const storageFile = 'my_tags.json'

export default {
  name: 'MyTagList',
  components: {
    TagList
  },
  data: () => ({
    blockstack: window.blockstack,
    storageFile: storageFile,
    tagsArray: []
  }),
  methods: {
    fetchTagFile () {
      // fetching project list
      this.blockstack.getFile(this.storageFile)
        .then((tagsText) => {
          const tags = JSON.parse(tagsText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let tag in tags) {
            this.blockstack.getFile(`${tag}.json`).then((tagJson) => {
              let tagData = typeof tagJson === 'string' ? JSON.parse(tagJson) : {}
              // this[data.id] = tagData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.tagsArray.push(tagData)
            })
          }
        })
    }
  },
  mounted () {
    this.fetchTagFile()
  }
}
</script>

<style scoped>

</style>
