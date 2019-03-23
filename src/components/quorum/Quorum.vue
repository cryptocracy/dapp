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

        <v-flex class="quorumtour">
          <v-expansion-panel :hover="true" class="titlePosition br20 mt-2" v-for="(item, index) in quorumData" :key="index">
            <span class='quorumTitle' v-if="lazyLoadedData[item.contentUrl]">{{lazyLoadedData[item.contentUrl].title}}</span>
            <img v-if="lazyLoadedData[item.contentUrl] && lazyLoadedData[item.contentUrl].image" width='759' height='300' :src="lazyLoadedData[item.contentUrl].image" alt="avatar">
            <v-expansion-panel-content>
              <div slot="header" v-if="lazyLoadedData[item.contentUrl]" class="fn16 displayFlex justify-space-between">
                <span><v-icon color='blue'>thumbs_up_down</v-icon></span>
                <span class='iconGroup'>
                  <v-icon class='iconStyle'>edit</v-icon>
                  <v-icon class='iconStyle' color="red ">place</v-icon>
                  <v-icon class='iconStyle' color="green ">image</v-icon>
                  <v-icon class='iconStyle' color="yellow ">today</v-icon>
                  <v-icon class='iconStyle' color="brown ">account_balance_wallet</v-icon>
                  <v-icon class='iconStyle' color="red ">favorite</v-icon>
                  <v-icon class='iconStyle' color="green ">share</v-icon>
                </span>
              </div>
              <v-card>
                <v-card-text class="py12px24">
                  <v-flex v-if="lazyLoadedData[item.contentUrl]" class="space-between">
                    <div>{{type(item.contentUrl)}}</div>
                    <v-btn dark color="teal accent-4" @click="redirectUser(item)" ><v-icon dark>keyboard_arrow_right</v-icon></v-btn>
                  </v-flex>
                  <!-- <div class="v-list__tile__sub-title" v-if="lazyLoadedData[item.contentUrl]" >{{lazyLoadedData[item.contentUrl].description}}</div> -->
                  <div class="v-list__tile__sub-title"><strong>Votes: {{item.votes}}</strong></div>
                  <div class="v-list__tile__sub-title"><strong>Content URL:</strong> <span>{{item.contentUrl}}</span></div>
                  <div class="v-list__tile__sub-title"><strong>Created On:</strong> {{new Date(Number(item.createdOn)).toDateString()}}</div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
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
    sortBy: 'pop',
    lazyLoadedData: {}
  }),
  computed: {
    ...mapGetters({
      quorumData: 'getQuorumData',
      contentUrlsData: 'getcontentUrlsData'
    })
  },
  watch: {
    deep: true,
    contentUrlsData () {
      this.lazyLoadedData = {}
      this.contentUrlsData.forEach(element => {
        this.lazyLoadedData[element.contentUrl] = element
      })
    }
  },
  methods: {
    type (contentUrl) {
      let type = contentUrl.includes('marker') ? 'MARKER'
        : contentUrl.includes('image') ? 'IMAGE'
          : contentUrl.includes('event') ? 'EVENT' : ''
      return type
    },
    async redirectUser (content) {
      this.$store.commit('toggleLoading')
      await this.$store.dispatch('ACTION_GET_CONTENT', content.contentUrl)
      this.$store.commit('toggleLoading')
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
  },
  created () {
    this.$store.dispatch('ACTION_GET_QUORUM_DATA', { sort: 'pop' })
  }
}
</script>

<style>
.br20 {
  border-radius: 20px
}
.inline-block {
  display: inline-block;
}
.space-between {
  margin-left: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.v-list__tile__sub-title {
  color: rgba(0,0,0,.54)
}
.iconStyle {
  margin: 0 6px;
}
.quorumTitle {
  position: absolute;
  color: white;
  font-size: 34px;
  left: 20px;
}
.displayFlex {
  display: flex;
}
.titlePosition {
  position: relative;
}
.iconGroup {
  margin: 0 10px;
}
</style>
