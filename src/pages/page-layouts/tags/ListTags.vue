<template>
    <div class="container">
        <v-layout row v-show="tagsArray.length">

            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <div class="tag-preferences">
                        <div class="tag-filter">
                            <div class="tag-check-group">
                                <v-checkbox
                                    v-model="filterAll"
                                    :disabled="filterAll"
                                />
                                <span class="checkbox-label">All</span>
                            </div>
                            <div class="tag-check-group">
                                <v-checkbox v-model="filterArchived"/>
                                <span class="checkbox-label">Archived</span>
                            </div>
                            <div class="tag-check-group">
                                <v-checkbox v-model="filterActive"/>
                                <span class="checkbox-label">Active</span>
                            </div>
                        </div>
                        <div class="tag-sorting">
                            <v-radio-group v-model="sortBy" row>
                                <div class="tag-radio-group">
                                    <v-radio value="name"></v-radio>
                                    <span class="radio-label">By Name</span>
                                </div>
                                <div class="tag-radio-group">
                                    <v-radio value="date"></v-radio>
                                    <span class="radio-label">By Date</span>
                                </div>
                            </v-radio-group>
                        </div>
                    </div>
                    <v-divider/>
                    <v-list two-line subheader>
                        <v-list-tile
                            v-for="tag in filteredTagsArray"
                            :key="tag.createdtime"
                            :to="{name: 'TagInfo', params: {
                            tagName: 'tag_'+tag.createdtime,
                            tagObject: tag,
                            }}"
                        >
                            <v-list-tile-avatar>
                                <v-icon color="blue lighten-4">label</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-text="tag.title"/>
                                <v-list-tile-sub-title v-text="tag.detail"/>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon :to="{ name: 'EditTag', params: { tagProp: tag } }">
                                    <v-icon color="grey lighten-1">edit</v-icon>
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
const STORAGE_FILE = 'my_tags.json'

export default {
  name: 'ListTags',
  data: () => ({
    blockstack: window.blockstack,
    tags: [],
    tagsArray: [],
    filterArchived: true,
    filterActive: true,
    sortBy: 'name'
  }),
  computed: {
    filterAll: {
      get () {
        return this.filterArchived && this.filterActive
      },
      set () {
        // if (this.filterAll) {
        this.filterArchived = true
        this.filterActive = true
        // }
      }
    },
    filteredTagsArray () {
      let sortFunc = (prev, next) => this.sortBy === 'name' ? prev.title.localeCompare(next.title) : prev.createdtime - next.createdtime
      // this.tagsArray.sort(sortFunc)
      return this.tagsArray.filter(tag => (this.filterArchived && tag.archived) || (this.filterActive && !tag.archived)).slice(0).sort(sortFunc)
    }
  },
  methods: {
    fetchTagFile () {
      // fetching project list
      this.blockstack.getFile(STORAGE_FILE)
        .then((tagsText) => {
          this.tags = JSON.parse(tagsText || '[]')
          // looping over project list to fetch unique json files for every project
          for (let tag in this.tags) {
            this.blockstack.getFile(`${tag}.json`).then((tagJson) => {
              let tagData = typeof tagJson === 'string' ? JSON.parse(tagJson) : {}
              // this[data.id] = tagData
              // this[data.id].tasks = this[data.id].tasks || []
              // creating task array for listing tasks under their respective project
              this.tagsArray.push(tagData)
            })
          }
        })
    }
  },
  mounted () {
    this.fetchTagFile()
  }
}
</script>

<style lang="scss" scoped>
    .tag-preferences {
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        .tag-sorting {
            display: flex;
            .input-group {
                flex-wrap: nowrap;
            }
            .tag-radio-group {
                display: flex;
                align-items: center;
                padding: 0 5px;
            }
        }
        .tag-filter {
            display: flex;
            padding-top: 18px;

            .tag-check-group {
                display: flex;
                align-items: center;
                padding: 0 5px;
                .input-group {
                    flex-wrap: nowrap;
                }
            }
        }
    }
</style>
