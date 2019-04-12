<template>
  <object-list
    v-if="objectsArray.length"
    :objectsArray='objectsArray'
    :hubUrl='hubUrl'
    :owned="!!!hubUrl"
    :type="type"
  />
  <v-layout v-else align-center justify-center row fill-height class="container">
    You have not yet created any content of this type yet
  </v-layout>
</template>

<script>
import ObjectList from '@/components/object/ObjectList'
import axios from 'axios'
import { mapGetters } from 'vuex'

// const storageFile = 'my_tasks.json'

export default {
  name: 'MyObjectList',
  components: {
    ObjectList
  },
  data: function () {
    return {
      blockstack: window.blockstack,
      // storageFile: `my_${this.type}s.json`,
      objectsArray: [],
      hubUrl: ''
    }
  },
  props: {
    type: String,
    required: true
  },
  computed: {
    storageFile () {
      return `my_${this.type}s.json`
    },
    ...mapGetters({
      contentData: 'getContentData'
    })
  },
  methods: {
    fetchTaskFile () {
      console.log('fetch')
      // fetching project list
      this.blockstack.getFile(this.storageFile, { decrypt: false })
        .then((objectsText) => {
          const objects = JSON.parse(objectsText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let object in objects) {
            this.blockstack.getFile(`${object}.json`, { decrypt: false }).then((objectJson) => {
              let objectData = typeof objectJson === 'string' ? JSON.parse(objectJson) : {}
              // this[data.id] = taskData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.objectsArray.push(objectData)
            })
          }
        })
    },
    fetchRedirectedUsersTaskFile (hubUrl) {
      // fetching project list
      axios.get(hubUrl + this.storageFile)
        .then((objectsText) => {
          const objects = objectsText.data || {}
          // looping over project list to fetch unique json files for every project
          for (let object in objects) {
            axios.get(`${hubUrl + object}.json`).then((objectJson) => {
              let objectData = objectJson ? objectJson.data : {}
              this.objectsArray.push(objectData)
            })
          }
        })
    }
  },
  // mounted () {
  // let hubUrl = this.$store.state.hubUrl
  // if (hubUrl) {
  //   this.hubUrl = hubUrl
  //   this.fetchRedirectedUsersTaskFile(hubUrl)
  // } else if (this.contentData && Object.keys(this.contentData).length > 0) {
  //   this.objectsArray.push(this.contentData)
  //   this.hubUrl = this.contentData.owner
  // } else {
  //   this.fetchTaskFile()
  // }
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.$store.commit('MUTATION_SET_CONTENT_DATA', null)
  //   console.log('sds')
  //   next(() => {
  //     console.log('fav')
  //   })
  // },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.$store.commit('MUTATION_SET_CONTENT_DATA', null)
      vm.objectsArray = []
      vm.fetchTaskFile()
    })
  },
  destroyed () {
    this.$store.state.hubUrl = null
    // this.$store.commit('MUTATION_SET_CONTENT_DATA', null)
  }
}
</script>

<style scoped>

</style>
