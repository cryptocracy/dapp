<template>
  <div class="container">
    <v-layout row v-show="objectsArray.length">

      <v-flex xs12 sm10 offset-sm1>
        <v-card class="br20">
          <div class="entity-preferences">
            <div class="entity-filter">
              <div class="entity-check-group">
                <v-checkbox
                  v-model="filterAll"
                  :disabled="filterAll"
                />
                <span class="checkbox-label">All</span>
              </div>
              <div class="entity-check-group">
                <v-checkbox v-model="filterArchived"/>
                <span class="checkbox-label">Archived</span>
              </div>
              <div class="entity-check-group">
                <v-checkbox v-model="filterActive"/>
                <span class="checkbox-label">Active</span>
              </div>
              <div class="entity-check-group">
                <v-checkbox v-model="filterUpcoming"/>
                <span class="checkbox-label">Upcoming</span>
              </div>
            </div>
            <div class="entity-sorting">
              <v-radio-group v-model="sortBy" row>
                <div class="entity-radio-group">
                  <v-radio value="name"></v-radio>
                  <span class="radio-label">By Name</span>
                </div>
                <div class="entity-radio-group">
                  <v-radio value="date"></v-radio>
                  <span class="radio-label">By Date</span>
                </div>
                <div class="entity-radio-group">
                  <v-radio value="startDate"></v-radio>
                  <span class="radio-label">By Start Date</span>
                </div>
              </v-radio-group>
            </div>
          </div>
          <v-divider/>
          <v-list two-line subheader>
            <v-list-tile
              v-for="object in filteredObjectsArray"
              :key="object.createdtime"
              @click="goTo(object)"
            >
              <v-list-tile-avatar>
                <v-icon color="orange lighten-4">today</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-text="object.title"/>
                <v-list-tile-sub-title v-text="object.detail"/>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn v-if="owned" icon @click.stop="goEdit(object)">
                  <v-icon color="grey lighten-1">edit</v-icon>
                </v-btn>
                <v-btn v-if="!hubUrl" icon @click.stop.prevent="removeFavorite($event, object)">
                  <v-icon color="grey lighten-1">favorite_border</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import storageService from '@/services/blockstack-storage'
import { mapMutations } from 'vuex'

export default {
  name: 'ObjectList',
  data: () => ({
    blockstack: window.blockstack,
    filterArchived: false,
    filterActive: false,
    filterUpcoming: true,
    sortBy: 'name',
    objects: []
  }),
  props: {
    objectsArray: {
      type: Array,
      required: true,
      default: () => []
    },
    type: {
      type: String,
      required: true
    },
    owned: {
      type: Boolean
    },
    hubUrl: {
      type: String
    }
  },
  computed: {
    filterAll: {
      get () {
        return this.filterArchived && this.filterActive
      },
      set () {
        this.filterArchived = true
        this.filterActive = true
        this.filterUpcoming = true
      }
    },
    filteredObjectsArray () {
      let sortFunc = (prev, next) => {
        if (this.sortBy === 'name') return prev.title.localeCompare(next.title)
        else if (this.sortBy === 'date') return prev.createdtime - next.createdtime
        else return +new Date(prev.start) - new Date(next.start)
      }
      return this.objects.filter(object => (this.filterArchived && object.archived) || (this.filterActive && !object.archived) || (this.filterUpcoming && (+new Date() < +new Date(object.end)))).slice(0).sort(sortFunc)
    }
  },
  methods: {
    ...mapMutations({
      setObjectData: 'MUTATION_SET_CONTENT_DATA'
    }),
    getFavObjectName (object) {
      return `${this.type}_${object.createdtime}_${JSON.parse(localStorage['blockstack-gaia-hub-config']).address}`
    },
    removeFavorite (e, object) {
      storageService.reduceFavoriteObjectIndex(this.getFavObjectName(object), object.title)
      this.objects = this.objects.filter(item => item.createdtime !== object.createdtime)
    },
    goEdit (object) {
      this.setObjectData(object)
      this.$router.push({ name: 'Edit' + this.$options.filters.capitalize(this.type), params: { objectProp: object }})
      this.$store.commit('MUTATION_SET_CONTENT_DATA', null)
    },
    goTo (object) {
      this.setObjectData(object)
      this.$router.push({
        name: this.$options.filters.capitalize(this.type) + 'Info', params: {
          // eventName: 'event_' + event.createdtime,
          object: object,
          hubUrl: this.hubUrl,
          type: this.type
        }
      })
    }
  },
  mounted () {
    this.objects = this.objectsArray
  }
}
</script>
