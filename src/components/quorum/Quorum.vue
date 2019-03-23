<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12>
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

        <v-layout class="quorumtour" row wrap>
          <v-flex :class="index === 0 ? 'xs12' : 'xs6'" v-for="(item, index) in quorumData" :key="index" >
            <!-- <v-expansion-panel :hover="true" class="titlePosition br20 mt-2" v-for="(item, index) in quorumData" :key="index">
              <span class='quorumTitle' v-if="lazyLoadedData[item.contentUrl]">{{lazyLoadedData[item.contentUrl].title}}</span>
              <img height="200px" v-if="lazyLoadedData[item.contentUrl] && lazyLoadedData[item.contentUrl].image"  :src="lazyLoadedData[item.contentUrl].image" alt="avatar">
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
                    <div class="v-list__tile__sub-title" v-if="lazyLoadedData[item.contentUrl]" >{{lazyLoadedData[item.contentUrl].description}}</div>
                    <div class="v-list__tile__sub-title"><strong>Votes: {{item.votes}}</strong></div>
                    <div class="v-list__tile__sub-title"><strong>Content URL:</strong> <span>{{item.contentUrl}}</span></div>
                    <div class="v-list__tile__sub-title"><strong>Created On:</strong> {{new Date(Number(item.createdOn)).toDateString()}}</div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel> -->

            <v-card hover class=" mt-2 br20" >
              <v-img
                :src="lazyLoadedData[item.contentUrl] ? lazyLoadedData[item.contentUrl].image : ''"
                height="250px"
                alt="No image"
              >
              </v-img>

              <v-card-title v-if="lazyLoadedData[item.contentUrl]" primary-title>
                <div>
                  <div class="headline">{{lazyLoadedData[item.contentUrl].title}}</div>
                  <span class="grey--text">{{lazyLoadedData[item.contentUrl].description || lazyLoadedData[item.contentUrl].detail}}</span>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-icon class=" ml-2" color='blue'>thumbs_up_down</v-icon> <span class="subheading ml-2">{{item.votes}}</span>
                <v-spacer></v-spacer>
                <span class='iconGroup'>
                  <v-icon class='iconStyle' color="brown ">account_balance_wallet</v-icon>
                  <v-icon class='iconStyle' color="red ">favorite</v-icon>
                </span>
                <v-btn icon @click="func(index)">
                  <v-icon>{{ showIndex[index] ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-slide-y-transition>
                <v-card-text v-if="showIndex[index]">

                  <v-chip color="primary" class="white--text" v-for="(tag, index1) in lazyLoadedData[item.contentUrl].tags || []" :key="index1" >
                    {{'#' + tag.title}}
                  </v-chip>
                  <!-- <div class="v-list__tile__sub-title" v-if="lazyLoadedData[item.contentUrl]" >{{lazyLoadedData[item.contentUrl].description}}</div> -->
                  <!-- <div class="v-list__tile__sub-title"><strong>Votes: {{item.votes}}</strong></div> -->
                  <div class="v-list__tile__sub-title"><strong>Owner Name:</strong> <span>{{lazyLoadedData[item.contentUrl].ownername || 'Na'}}</span></div>
                  <div class="v-list__tile__sub-title"><strong>Created On:</strong> {{new Date(Number(item.createdOn)).toDateString()}}</div>
                  <div class="v-list__tile__sub-title"><strong>OwnerId:</strong> <span>{{lazyLoadedData[item.contentUrl].owner}}</span></div>
                  <div class="v-list__tile__sub-title"><strong>Content URL:</strong> <span>{{item.contentUrl}}</span></div>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
        </v-layout>
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
    lazyLoadedData: {},
    show: false,
    showIndex: {}
  }),
  computed: {
    ...mapGetters({
      quorumData: 'getQuorumData',
      contentUrlsData: 'getcontentUrlsData'
    })
    // showIndex () {
    //   console.log('HEREEEEE')
    //   if (this.quorumData && this.quorumData.length > 0) {
    //     let a = {}
    //     this.quorumData.forEach((item, index) => {
    //       a[index] = false
    //     })
    //     console.log(a)
    //     return a
    //   }
    //   return {}
    // }
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
    func (index) {
      console.log('INDEXXX', index)
      this.showIndex[index] = !this.showIndex[index]
      console.log(this.showIndex)
    },
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
    if (this.quorumData && this.quorumData.length > 0) {
      this.quorumData.forEach((item, index) => {
        this.$set(this.showIndex, index, false)
      })
    }
    this.$store.dispatch('ACTION_GET_QUORUM_DATA', { sort: 'pop' }).then(res => {
      for (let i = 0; i < res.length / 2; i++) {
        this.$set(this.showIndex, i, false)
      }
    })
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
