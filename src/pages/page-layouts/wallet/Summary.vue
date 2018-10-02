<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-list three-line>
                    <template v-for="(item, index) in coins">

                        <v-divider
                            v-if="index !== 0"
                            :inset="item.inset"
                            :key="index"
                        ></v-divider>

                        <v-list-tile
                            :key="item.title"
                            avatar
                        >
                            <v-list-tile-avatar>
                                <img :src="item.imgLink">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.address"></v-list-tile-sub-title>
                                <v-list-tile-sub-title v-html="item.amount"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
// import storageService from '../../../services/blockstack-storage'
// import CoinKey from 'coinkey'
import axios from 'axios'
// const buffer = new Buffer(JSON.parse(localStorage['blockstack-gaia-hub-config']).address, 'hex')
const btcAddress = JSON.parse(localStorage['blockstack-gaia-hub-config']).address

export default {
  name: 'Summary',
  data: () => ({
    coins: [
      {
        title: 'BTC',
        address: btcAddress,
        amount: '',
        imgLink: ''
      },
      {
        title: 'ETH',
        address: '',
        amount: '',
        imgLink: ''
      },
      {
        title: 'LTC',
        address: '',
        amount: '',
        imgLink: ''
      }
    ]
  }),
  mounted () {
    // storageService.getFile({fileName: 'my_wallet.json'})
    //   .then(res => {
    //     if (!res) {
    //       console.log(CoinKey.fromWif(JSON.parse(localStorage['blockstack-gaia-hub-config']).address))
    //     }
    //   })
    axios.get('https://blockchain.info/q/addressbalance/' + btcAddress)
      .then(res => {
        console.log(res)
        this.coins.filter(item => item.title === 'BTC')[0].amount = res.data
      })
  }
}
</script>

<style scoped>

</style>
