<template>
  <event-list
    :eventsArray='eventsArray'
    :hubUrl='hubUrl'
    :owned="!!!hubUrl"
  />
</template>

<script>
import EventList from './EventList'
import axios from 'axios'

const storageFile = 'my_events.json'

export default {
  name: 'MyEventList',
  components: {
    EventList
  },
  data: () => ({
    blockstack: window.blockstack,
    storageFile: storageFile,
    eventsArray: [],
    hubUrl: ''
  }),
  methods: {
    fetchEventFile () {
      // fetching project list
      this.blockstack.getFile(this.storageFile)
        .then((eventsText) => {
          const events = JSON.parse(eventsText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let event in events) {
            this.blockstack.getFile(`${event}.json`).then((eventJson) => {
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
    } else {
      this.fetchEventFile()
    }
  },
  destroyed () {
    this.$store.state.hubUrl = null
  }
}
</script>

<style scoped>

</style>
