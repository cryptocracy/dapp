<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 d-flex justify-space-around>
        <v-btn fab dark :color="upvote?'pink':'grey'" @click="voteUp()">
          <v-icon dark>thumb_up_alt</v-icon>
        </v-btn>
        <v-btn fab dark :color="downvote?'blue':'grey'" @click="voteDown()">
          <v-icon dark>thumb_down_alt</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import storageService from '@/services/blockstack-storage'

export default {
  name: 'voter',
  data: () => ({
    upvote: true,
    downvote: true,
    myVoteData: []
  }),
  props: {
    itemsObject: {
      type: Object
    },
    hubUrl: {
      type: String
    }
  },
  watch: {
    deep: true,
    itemsObject (newValue, oldValue) {
      console.log('itemsObject newvalue: ', newValue)
      if (newValue['votedOn'] && newValue['vote'] === 1) {
        this.upvote = true
        this.downvote = false
      } else {
        this.downvote = true
        this.upvote = false
      }
    }
  },
  mounted () {
    storageService.getFile({
      fileName: 'my_votes.json',
      options: {decrypt: false}
    }).then(res => {
      console.log('votes res: ', res)
      // this.myVoteData = res
    })
  },
  methods: {
    getIndex () {
      return 0
    },
    voteUp () {
      this.upvote = true
      this.downvote = false
      this.itemsObject['vote'] = 1
      this.updateMyVote()
    },
    voteDown () {
      this.downvote = true
      this.upvote = false
      this.itemsObject['vote'] = -1
      this.updateMyVote()
    },
    updateMyVote () {
      let currentDate = new Date()
      if (this.itemsObject['votedOn']) {
        this.itemsObject['voteUpdatedOn'] = currentDate
      } else {
        this.itemsObject['votedOn'] = currentDate
        this.itemsObject['voteUpdatedOn'] = currentDate
      }
      let index = this.getIndex() ? this.getIndex() : 0
      console.log('index: ', index)
      if (index) {
        this.myVoteData[index] = this.itemsObject
      } else {
        this.myVoteData.push(this.itemsObject)
      }
      console.log('itemsObject: ', this.itemsObject)
      console.log('myVoteData: ', this.myVoteData)

      storageService.putFile({
        fileName: 'my_votes.json',
        data: this.myVoteData,
        options: {decrypt: false}
      })
    }
  }
}
</script>

<style>

</style>
