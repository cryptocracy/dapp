<template>
  <object-list v-if="objectsArray.length" :objectsArray="objectsArray" :type="type"/>
  <v-layout v-else align-center justify-center row fill-height class="container">
    You have not saved any of this type of content to your favorites yet
  </v-layout>
</template>

<script>
import ObjectList from '@/components/object/ObjectList'
import axios from 'axios'

// const storageFile = 'my_fav_objects.json'

export default {
  name: 'FavoriteObjectList',
  components: {
    ObjectList
  },
  data: function () {
    return {
      blockstack: window.blockstack,
      objectsArray: []
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    storageFile () {
      return `my_fav_${this.type}s.json`
    }
  },
  methods: {
    fetchObjectFile () {
      console.log(this.type)
      // fetching project list
      this.blockstack.getFile(this.storageFile, { decrypt: false })
        .then((objectsText) => {
          console.log(objectsText)
          const objects = JSON.parse(objectsText || '[]')
          const urlPrefix = JSON.parse(localStorage['blockstack-gaia-hub-config']).url_prefix
          // looping over project list to fetch unique json files for every project
          for (let object in objects) {
            axios.get(`${urlPrefix}${object.split('_')[2]}/${this.type}_${object.split('_')[1]}.json`).then((objectJson) => {
              this.objectsArray.push(objectJson.data)
            })
          }
        })
    }
  },
  // mounted () {
    // this.fetchObjectFile()
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.$store.commit('MUTATION_SET_CONTENT_DATA', null)
  //   this.fetchObjectFile()
  //   console.log('fav')
  //   next()
  // }
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // access to component's instance using `vm`
      vm.$store.commit('MUTATION_SET_CONTENT_DATA', null)
      vm.objectsArray = []
      vm.fetchObjectFile()
    })
  }
}
</script>

<style scoped>

</style>
