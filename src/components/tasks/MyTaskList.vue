<template>
  <object-list
    v-if="objectsArray.length"
    :objectsArray='objectsArray'
    :hubUrl='hubUrl'
    :owned="!!!hubUrl"
    type="task"
  />
  <v-layout v-else align-center justify-center row fill-height class="container">
    You have not yet created any content of this type yet
  </v-layout>
</template>

<script>
import ObjectList from '@/components/object/ObjectList'
import axios from 'axios'
import { mapGetters } from 'vuex'

const storageFile = 'my_tasks.json'

export default {
  name: 'MyTaskList',
  components: {
    ObjectList
  },
  data: () => ({
    blockstack: window.blockstack,
    storageFile: storageFile,
    objectsArray: [],
    hubUrl: ''
  }),
  computed: {
    ...mapGetters({
      contentData: 'getContentData'
    })
  },
  methods: {
    fetchTaskFile () {
      // fetching project list
      this.blockstack.getFile(this.storageFile, { decrypt: false })
        .then((tasksText) => {
          const tasks = JSON.parse(tasksText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let task in tasks) {
            this.blockstack.getFile(`${task}.json`, { decrypt: false }).then((taskJson) => {
              let taskData = typeof taskJson === 'string' ? JSON.parse(taskJson) : {}
              // this[data.id] = taskData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.objectsArray.push(taskData)
            })
          }
        })
    },
    fetchRedirectedUsersTaskFile (hubUrl) {
      // fetching project list
      axios.get(hubUrl + storageFile)
        .then((tasksText) => {
          const tasks = tasksText.data || {}
          // looping over project list to fetch unique json files for every project
          for (let task in tasks) {
            axios.get(`${hubUrl + task}.json`).then((taskJson) => {
              let taskData = taskJson ? taskJson.data : {}
              this.objectsArray.push(taskData)
            })
          }
        })
    }
  },
  mounted () {
    let hubUrl = this.$store.state.hubUrl
    if (hubUrl) {
      this.hubUrl = hubUrl
      this.fetchRedirectedUsersTaskFile(hubUrl)
    } else if (this.contentData && Object.keys(this.contentData).length > 0) {
      this.objectsArray.push(this.contentData)
      this.hubUrl = this.contentData.owner
    } else {
      this.fetchTaskFile()
    }
  },
  destroyed () {
    this.$store.state.hubUrl = null
    // this.$store.commit('MUTATION_SET_CONTENT_DATA', null)
  }
}
</script>

<style scoped>

</style>
