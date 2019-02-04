<template>
  <v-layout row>
    <v-flex class="disFlex" xs12 justify-space-around>
      <div class="flex xs6 disFlex justify-space-around align-center pr-0">
        <span class="count green--text">2</span>
        <v-btn fab dark class="hoverAnimation m-0" :color="upvote?'green':'grey'" @click="voteUp()">
          <v-icon dark>thumb_up_alt</v-icon>
        </v-btn>
      </div>
      <div class="flex xs6 disFlex justify-space-around align-center pr-0">
        <v-btn fab dark class="hoverAnimation m-0" :color="downvote?'red':'grey'" @click="voteDown()">
          <v-icon dark>thumb_down_alt</v-icon>
        </v-btn>
        <span class="count red--text">2</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import storageService from '@/services/blockstack-storage'
import cryptocracyServices from '@/services/cryptocracy'

export default {
  name: 'voter',
  data: () => ({
    upvote: false,
    downvote: false,
    myVoteData: [],
    currentVoteStatus: {}
  }),
  props: {
    itemsObject: {
      type: Object
    },
    hubUrl: {
      type: String
    },
    type: String
  },
  watch: {
    deep: true,
    currentVoteStatus (newValue, oldValue) {
      if (newValue) {
        cryptocracyServices.countVotes({gaia: newValue.contentUrl}).then((res) => {
          console.log('got counts in comp: ', res)
        })
        if (newValue['votedOn'] && newValue['vote'] === 1) {
          this.upvote = true
          this.downvote = false
        } else {
          this.downvote = true
          this.upvote = false
        }
      }
    }
  },
  mounted () {
    storageService.getFile({
      fileName: 'my_votes.json',
      options: {decrypt: false}
    }).then(res => {
      this.myVoteData = res.length ? res : []
      this.currentVoteStatus = this.myVoteData[this.getIndex()]
    })
  },
  methods: {
    getIndex () {
      return this.myVoteData.findIndex((item, index) => {
        return item.title === this.itemsObject.title
      })
    },
    voteUp () {
      this.upvote = true
      this.downvote = false
      if (this.currentVoteStatus && this.currentVoteStatus['vote']) {
        this.currentVoteStatus['vote'] = 1
      } else {
        this.itemsObject['vote'] = 1
      }
      this.updateMyVote()
    },
    voteDown () {
      this.downvote = true
      this.upvote = false
      if (this.currentVoteStatus && this.currentVoteStatus['vote']) {
        this.currentVoteStatus['vote'] = -1
      } else {
        this.itemsObject['vote'] = -1
      }
      this.updateMyVote()
    },
    updateVoteStatus (item) {
      if (!item['contentUrl']) {
        let urlItems = {}
        if (localStorage['blockstack-gaia-hub-config']) {
          urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
        }
        // creating hub url(where our files are stored)
        const contentUrl = `${urlItems.url_prefix}${item.owner}/${this.type}_${item.createdtime}.json`
        item['contentUrl'] = contentUrl
      }

      let currentDate = new Date().getTime()
      if (item['votedOn']) {
        item['voteUpdatedOn'] = currentDate
      } else {
        item['votedOn'] = currentDate
        item['voteUpdatedOn'] = currentDate
      }
    },
    updateMyVote () {
      if (this.currentVoteStatus && this.currentVoteStatus['vote']) {
        this.updateVoteStatus(this.currentVoteStatus)
      } else {
        this.updateVoteStatus(this.itemsObject)
      }

      let index = this.getIndex() ? this.getIndex() : 0

      if (index >= 0) {
        this.myVoteData[index] = this.currentVoteStatus
      } else {
        this.myVoteData.push(this.itemsObject)
      }
      storageService.putFile({
        fileName: 'my_votes.json',
        data: this.myVoteData,
        options: { encrypt: false }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .disFlex {
    display: flex;
  }
  .count {
    font-size: 20px;
  }
  .hoverAnimation:hover {
    animation: swing 2s -1.2s ease-out;
  }
  @keyframes swing {
    0%   {transform: rotate(10deg) scale(1)}
    10%  {transform: rotate(-20deg) scale(1.1)}
    20%  {transform: rotate(20deg) scale(1)}
    30%  {transform: rotate(-20deg) scale(1.1)}
    40%  {transform: rotate(20deg) scale(1)}
    50%  {transform: rotate(-20deg) scale(1.1)}
    60%  {transform: rotate(20deg) scale(1)}
    70%  {transform: rotate(-20deg) scale(1.1)}
    80%  {transform: rotate(20deg) scale(1)}
    90%  {transform: rotate(-20deg) scale(1.1)}
    100% {transform: rotate(10deg) scale(1)}
  }
</style>
