<template>
    <div class="container">
        <v-layout row v-show="tagsArray.length">
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-list two-line subheader>
                        <v-list-tile
                            v-for="tag in tagsArray"
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
    tagsArray: []
  }),
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

<style scoped>

</style>
