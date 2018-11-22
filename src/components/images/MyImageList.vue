<template>
  <image-list
    :imagesArray='imagesArray'
    owned
  />
</template>

<script>
import ImageList from './ImageList'

const storageFile = 'my_images.json'

export default {
  name: 'MyImageList',
  components: {
    ImageList
  },
  data: () => ({
    blockstack: window.blockstack,
    storageFile: storageFile,
    imagesArray: []
  }),
  methods: {
    fetchImageFile () {
      // fetching project list
      this.blockstack.getFile(this.storageFile)
        .then((imagesText) => {
          const images = JSON.parse(imagesText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let image in images) {
            this.blockstack.getFile(`${image}.json`).then((imageJson) => {
              let imageData = typeof imageJson === 'string' ? JSON.parse(imageJson) : {}
              // this[data.id] = imageData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.imagesArray.push(imageData)
            })
          }
        })
    }
  },
  mounted () {
    this.fetchImageFile()
  }
}
</script>

<style scoped>

</style>
