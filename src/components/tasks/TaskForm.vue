<template>
  <v-card class="container">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="task.title"
        :rules="titleRules"
        :counter="32"
        :disabled="isLoading"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="task.description"
        label="Description"
        :disabled="isLoading"
      ></v-text-field>
      <v-select
        :items="stages"
        label="Stage"
        v-model="task.stage"
        :disabled="isLoading"
      ></v-select>
      <v-select
        :items="symbols"
        label="Symbol"
        v-model="task.symbol"
        :disabled="isLoading"
      ></v-select>
      <v-text-field
        v-model="task.address"
        :rules="addressRules"
        :counter="42"
        label="Crypto Address"
        :disabled="isLoading"
      ></v-text-field>
      <v-text-field
        v-model="task.amount"
        label="Amount"
        :disabled="isLoading"
      ></v-text-field>
      <div class="date-time-picker">
        <datetime
          v-model="task.due"
          type='datetime'
          input-id="startDate"
          :min-datetime="new Date().toISOString()"
        >
          <label class="v-btn theme--light" for="startDate" slot="before">Due date</label>
        </datetime>
      </div>
      <v-select
        :items="markers"
        label="Marker"
        item-text="title"
        v-model="task.marker"
        :disabled="isLoading"
        return-object
      ></v-select>
      <v-select
        :items="images"
        label="Image(s)"
        item-text="title"
        v-model="task.images"
        :disabled="isLoading"
        return-object
        multiple
        chips
      ></v-select>
      <v-combobox
        v-model="tags"
        chips
        :rules="tagsRules"
        multiple
        label="Tags"
        hint="Add multiple tags by pressing Enter or Tab button after writing tag name. You can add a maximum of 5 tags."
        :persistent-hint="true"
      ></v-combobox>
      <v-combobox
        v-model="events"
        chips
        :rules="tagsRules"
        multiple
        label="Events"
        hint="Add multiple events by pressing Enter or Tab button after writing tag name. You can add a maximum of 5 events."
        :persistent-hint="true"
      ></v-combobox>
      <!--<div class="switch-wrapper">-->
      <!--<div class="input-group&#45;&#45;text-field primary&#45;&#45;text">Privacy</div>-->
      <!--<div class="switch-block">-->
      <!--<span class="switch-text">Public</span>-->
      <!--<v-switch v-model="task.limit"></v-switch>-->
      <!--<span class="switch-text">Personal</span>-->
      <!--</div>-->
      <!--</div>-->
      <div class="switch-wrapper" v-if="taskProp">
        <div class="input-group--text-field primary--text">Archived</div>
        <div class="switch-block">
          <span class="switch-text">No</span>
          <v-switch v-model="task.archived"></v-switch>
          <span class="switch-text">Yes</span>
        </div>
      </div>
      <v-btn
        :disabled="!valid || isLoading"
        @click="submit"
      >
        submit
      </v-btn>
      <v-btn
        @click="clear"
        :disabled="isLoading"
      >
        clear
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import storageService from '@/services/blockstack-storage'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'
import objectHelpers from '@/helpers/objectHelpers.js'
import validationService from '@/helpers/validate'
import 'vue-datetime/dist/vue-datetime.css'

const cryptoAddress = localStorage['blockstack-gaia-hub-config'] ? JSON.parse(localStorage['blockstack-gaia-hub-config']).address : ''
const cryptoName = localStorage['blockstack'] ? JSON.parse(localStorage['blockstack']).username : ''

Settings.defaultLocale = 'en'

export default {

  data: () => ({
    blockstack: window.blockstack,
    isLoading: false,
    valid: false,
    markers: [],
    tags: [],
    stages: [
      'To Do',
      'In progress',
      'Review',
      'Done'
    ],
    images: [],
    task: {
      title: '',
      description: '',
      address: '',
      amount: '',
      due: null,
      tags: [],
      events: [],
      images: null,
      marker: null,
      symbol: null,
      task: null,
      limit: false,
      archived: false,
      v: '0.0.1',
      id: ''
    },
    symbols: ['BTC', 'STX'],
    titleRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 32) || 'Name must be less than 32 characters',
      v => /^[\w ]+$/.test(v) || 'Letters, numbers, spaces and "_" are only allowed'
    ],
    addressRules: [
      v => v ? /^((?!_)[A-z0-9])+$/.test(v) || 'Letters and numbers are only allowed' : true,
      v => v ? v.length <= 42 || 'Please enter proper address' : true
    ],
    tagsRules: [
      v => validationService.validateTags(v)
    ],
    eventsRules: [
      v => validationService.validateEvents(v)
    ]
  }),
  components: {
    Datetime
  },
  props: {
    taskProp: {
      type: [Object, null],
      default: null
    }
  },
  watch: {
    taskProp () {
      this.updateFromTaskProp()
    },
    tags () {
      if (this.tags.length > 5) {
        this.tags.pop()
      }
    }
  },
  methods: {
    submit () {
      const timestamp = +new Date()
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.task.createdtime = this.taskProp ? this.taskProp.createdtime : timestamp
        this.task.owner = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
        this.task.ownername = cryptoName
        this.task.tags = []
        this.tags.forEach(element => {
          this.task.tags.push({title: element})
        })
        this.saveTask(timestamp)
      }
    },
    getTaskFilename (timestamp) {
      return this.taskProp ? `task_${this.taskProp.createdtime}.json` : `task_${timestamp}.json`
    },
    saveTask (timestamp) {
      this.blockstack.putFile(this.getTaskFilename(timestamp), JSON.stringify(this.task), { encrypt: false })
        .then((jsonUrl) => {
          storageService.updateTaskIndex(jsonUrl.split('/').pop().split('.')[0], this.task.title)
            .then(() => {
              this.isLoading = false
              this.taskProp ? this.$router.push({
                name: 'TaskInfo',
                params: {
                  taskName: 'task_' + this.task.createdtime,
                  taskObject: this.task
                }
              }) : this.clear()
            })
        })
    },
    clear () {
      this.$refs.form.reset()
      this.task.start = undefined
      this.task.end = undefined
    },
    updateFromTaskProp () {
      if (this.taskProp) {
        for (let property in this.taskProp) {
          this.task[property] = this.taskProp[property] instanceof Object ? {...this.taskProp[property]} : this.taskProp[property]
        }
        this.task.images = objectHelpers.toArray(this.task.images)
        // this.task.tags = objectHelpers.toArray(this.task.tags)
        this.taskProp.tags.forEach(item => {
          this.tags.push(item.title)
        })
      } else {
        this.clear()
      }
    },
    fetchMarkers () {
      // fetching markers list
      this.blockstack.getFile('my_markers.json', { decrypt: false })
        .then((markersJSON) => {
          let markersObj = JSON.parse(markersJSON)
          if (markersObj) {
            this.markers = Object.keys(markersObj).map((key) => {
              return {
                address: 'https://gaia.blockstack.org/hub/' + cryptoAddress + '/' + key + '.json',
                title: markersObj[key]
              }
            })
          }
          this.blockstack.getFile('my_fav_markers.json', { decrypt: false })
            .then((favMarkersJSON) => {
              let favMarkersObj = JSON.parse(favMarkersJSON)
              if (favMarkersObj) {
                Object.keys(favMarkersObj).forEach((key) => {
                  if (key.split('_')[2] !== cryptoAddress) {
                    this.markers.push({
                      address: 'https://gaia.blockstack.org/hub/' + key.split('_')[2] + '/' + key.substr(0, key.lastIndexOf('_')) + '.json',
                      title: favMarkersObj[key]
                    })
                  }
                })
              }
            })
        })
    },
    // fetchTags () {
    //   // fetching tags list
    //   this.blockstack.getFile('my_tags.json', { decrypt: false })
    //     .then((tagsJSON) => {
    //       let tagsObj = JSON.parse(tagsJSON)
    //       if (tagsObj) {
    //         this.tags = Object.keys(tagsObj).map((key) => {
    //           return {
    //             address: 'https://gaia.blockstack.org/hub/' + cryptoAddress + '/' + key + '.json',
    //             title: tagsObj[key]
    //           }
    //         })
    //       }
    //       this.blockstack.getFile('my_fav_tags.json', { decrypt: false })
    //         .then((favTagsJSON) => {
    //           let favTagsObj = JSON.parse(favTagsJSON)
    //           if (favTagsJSON) {
    //             Object.keys(favTagsObj).forEach((key) => {
    //               if (key.split('_')[2] !== cryptoAddress) {
    //                 this.tags.push({
    //                   address: 'https://gaia.blockstack.org/hub/' + key.split('_')[2] + '/' + key.substr(0, key.lastIndexOf('_')) + '.json',
    //                   title: favTagsObj[key]
    //                 })
    //               }
    //             })
    //           }
    //         })
    //     })
    // },
    fetchImages () {
      // fetching images list
      this.blockstack.getFile('my_images.json', { decrypt: false })
        .then((imagesJSON) => {
          let imagesObj = JSON.parse(imagesJSON)
          if (imagesObj) {
            this.images = Object.keys(imagesObj).map((key) => {
              return {
                address: 'https://gaia.blockstack.org/hub/' + cryptoAddress + '/' + key + '.json',
                title: imagesObj[key]
              }
            })
          }
          // this.blockstack.getFile('my_fav_images.json', { decrypt: false })
          //   .then((favTagsJSON) => {
          //     let favTagsObj = JSON.parse(favTagsJSON)
          //     if (favTagsJSON) {
          //       Object.keys(favTagsObj).forEach((key) => {
          //         if (key.split('_')[2] !== cryptoAddress) {
          //           this.images.push({
          //             address: 'https://gaia.blockstack.org/hub/' + key.split('_')[2] + '/' + key.substr(0, key.lastIndexOf('_')) + '.json',
          //             title: favTagsObj[key]
          //           })
          //         }
          //       })
          //     }
          //   })
        })
    }
  },
  mounted () {
    this.updateFromTaskProp()
    this.fetchMarkers()
    // this.fetchTags()
    this.fetchImages()
  }
}
</script>
