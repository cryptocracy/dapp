<template>
  <object-list
    v-if="eventsArray.length"
    :objectsArray='eventsArray'
    :hubUrl='hubUrl'
    :owned="!!!hubUrl"
    type="event"
  />
  <v-layout v-else align-center justify-center row fill-height class="container">
    You have not yet created any content of this type yet
  </v-layout>
</template>

<script>
import ObjectList from '@/components/object/ObjectList'
import axios from 'axios'
import { mapGetters } from 'vuex'

const storageFile = 'my_events.json'

export default {
  name: 'MyEventList',
  components: {
    ObjectList
  },
  data: () => ({
    blockstack: window.blockstack,
    storageFile: storageFile,
    eventsArray: [],
    hubUrl: ''
  }),
  computed: {
    ...mapGetters({
      contentData: 'getContentData'
    })
  },
  methods: {
    fetchEventFile () {
      // fetching project list
      this.blockstack.getFile(this.storageFile, { decrypt: false })
        .then((eventsText) => {
          const events = JSON.parse(eventsText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let event in events) {
            this.blockstack.getFile(`${event}.json`, { decrypt: false }).then((eventJson) => {
              let eventData = typeof eventJson === 'string' ? JSON.parse(eventJson) : {}
              // this[data.id] = eventData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.eventsArray.push(eventData)
            })
          }
        })
    },
    fetchRedirectedUsersEventFile (hubUrl) {
      // fetching project list
      axios.get(hubUrl + storageFile)
        .then((eventsText) => {
          const events = eventsText.data || {}
          // looping over project list to fetch unique json files for every project
          for (let event in events) {
            axios.get(`${hubUrl + event}.json`).then((eventJson) => {
              let eventData = eventJson ? eventJson.data : {}
              this.eventsArray.push(eventData)
            })
          }
        })
    }
  },
  mounted () {
    let hubUrl = this.$store.state.hubUrl
    if (hubUrl) {
      this.hubUrl = hubUrl
      this.fetchRedirectedUsersEventFile(hubUrl)
    } else if (this.contentData && Object.keys(this.contentData).length > 0) {
      this.eventsArray.push(this.contentData)
      this.hubUrl = this.contentData.owner
    } else {
      this.fetchEventFile()
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
