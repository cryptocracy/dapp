<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs10>
        <v-layout justify-end row wrap>
          <v-flex xs3 class='quorumList'>
            <v-select
              label="Sort By"
              :items="list"
              v-model="sortBy"
              @input="changeSortBy"
            >
            </v-select>
          </v-flex>
        </v-layout>
        <v-flex class='quorumtour'>
          <v-card :hover="true" @click="redirectUser(item)" class="br20 mt-2" v-for="(item, index) in quorumData" :key="index">
            <v-list two-line>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title>Votes: {{item.votes}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>Content URL: <span>{{item.contentUrl}}</span></v-list-tile-sub-title>
                  <!-- <v-list-tile-title></v-list-tile-title> -->
                  <v-list-tile-sub-title>Created On: {{new Date(Number(item.createdOn)).toDateString()}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    list: [
      { text: 'Popularity', value: 'pop' },
      { text: 'Votes Sum', value: 'sum' }
    ],
    sortBy: 'pop'
  }),
  computed: {
    ...mapGetters({
      quorumData: 'getQuorumData'
    })
  },
  methods: {
    async redirectUser (content) {
      await this.$store.dispatch('ACTION_GET_CONTENT', content.contentUrl)
      if (content.contentUrl.includes('marker')) this.$router.push({name: 'OwnedMarkers'})
      else if (content.contentUrl.includes('tag')) this.$router.push({name: 'Owned'})
      else if (content.contentUrl.includes('image')) this.$router.push({name: 'OwnedImages'})
      else if (content.contentUrl.includes('event')) this.$router.push({name: 'OwnedEvents'})
    },
    async changeSortBy () {
      this.$store.commit('toggleLoading')
      await this.$store.dispatch('ACTION_GET_QUORUM_DATA', { sort: this.sortBy })
      this.$store.commit('toggleLoading')
    }
  }
}
</script>

<style>
.br20 {
  border-radius: 20px
}
</style>
