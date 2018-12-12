<template>
  <div class="container">
    <v-layout row v-show="eventsArray.length">

      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <div class="event-preferences">
            <div class="event-filter">
              <div class="event-check-group">
                <v-checkbox
                  v-model="filterAll"
                  :disabled="filterAll"
                />
                <span class="checkbox-label">All</span>
              </div>
              <div class="event-check-group">
                <v-checkbox v-model="filterArchived"/>
                <span class="checkbox-label">Archived</span>
              </div>
              <div class="event-check-group">
                <v-checkbox v-model="filterActive"/>
                <span class="checkbox-label">Active</span>
              </div>
            </div>
            <div class="event-sorting">
              <v-radio-group v-model="sortBy" row>
                <div class="event-radio-group">
                  <v-radio value="name"></v-radio>
                  <span class="radio-label">By Name</span>
                </div>
                <div class="event-radio-group">
                  <v-radio value="date"></v-radio>
                  <span class="radio-label">By Date</span>
                </div>
              </v-radio-group>
            </div>
          </div>
          <v-divider/>
          <v-list two-line subheader>
            <v-list-tile
              v-for="event in filteredEventsArray"
              :key="event.createdtime"
              :to="{name: 'EventInfo', params: {
                eventName: 'event_'+event.createdtime,
                eventObject: event,
                hubUrl: hubUrl
              }}"
            >
              <v-list-tile-avatar>
                <v-icon color="blue lighten-4">label</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-text="event.title"/>
                <v-list-tile-sub-title v-text="event.detail"/>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn v-if="owned" icon :to="{ name: 'EditEvent', params: { eventProp: event } }">
                  <v-icon color="grey lighten-1">edit</v-icon>
                </v-btn>
                <v-btn v-if="!hubUrl" icon @click.stop.prevent="removeFavorite($event, event)">
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

export default {
  name: 'EventList',
  data: () => ({
    blockstack: window.blockstack,
    filterArchived: true,
    filterActive: true,
    sortBy: 'name',
    events: []
  }),
  props: {
    eventsArray: {
      type: Array,
      required: true,
      default: () => []
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
      }
    },
    filteredEventsArray () {
      let sortFunc = (prev, next) => this.sortBy === 'name' ? prev.title.localeCompare(next.title) : prev.createdtime - next.createdtime
      return this.events.filter(event => (this.filterArchived && event.archived) || (this.filterActive && !event.archived)).slice(0).sort(sortFunc)
    }
  },
  methods: {
    getFavEventName (event) {
      return `event_${event.createdtime}_${JSON.parse(localStorage['blockstack-gaia-hub-config']).address}`
    },
    removeFavorite (e, event) {
      storageService.reduceFavoriteEventIndex(this.getFavEventName(event), event.title)
      this.events = this.events.filter(item => item.createdtime !== event.createdtime)
    }
  },
  mounted () {
    this.events = this.eventsArray
  }
}
</script>

<style lang="scss" scoped>
    .event-preferences {
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        .event-sorting {
            display: flex;
            align-items: center;
            padding-top: 18px;
            .input-group {
                flex-wrap: nowrap;
            }
            .event-radio-group {
                display: flex;
                align-items: center;
                padding: 0 5px;
                .v-radio {
                    margin: 0;
                }
                .radio-label {
                    font-size: 14px;
                }
            }
        }
        .event-filter {
            display: flex;
            padding-top: 18px;
            .event-check-group {
                display: flex;
                align-items: center;
                padding: 0 5px;
                .input-group {
                    flex-wrap: nowrap;
                }
                .checkbox-label {
                    margin-top: -3px;
                }
            }
        }
    }
</style>
