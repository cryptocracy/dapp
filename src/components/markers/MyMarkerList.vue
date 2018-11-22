<template>
  <marker-list
    :markersArray='markersArray'
    owned
  />
</template>

<script>
import MarkerList from './MarkerList'

const storageFile = 'my_markers.json'

export default {
  name: 'MyMarkerList',
  components: {
    MarkerList
  },
  data: () => ({
    blockstack: window.blockstack,
    storageFile: storageFile,
    markersArray: []
  }),
  methods: {
    fetchMarkerFile () {
      // fetching project list
      this.blockstack.getFile(this.storageFile)
        .then((markersText) => {
          const markers = JSON.parse(markersText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let marker in markers) {
            this.blockstack.getFile(`${marker}.json`).then((markerJson) => {
              let markerData = typeof markerJson === 'string' ? JSON.parse(markerJson) : {}
              // this[data.id] = markerData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.markersArray.push(markerData)
            })
          }
        })
    }
  },
  mounted () {
    this.fetchMarkerFile()
  }
}
</script>

<style scoped>

</style>
