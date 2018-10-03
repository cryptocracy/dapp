<template>
    <v-layout row>
        <v-flex xs12 sm10 offset-sm1>
            <v-card>
                <v-list three-line>
                    <template v-for="(item, index) in transactions">

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
                                <v-icon>arrow_right_alt</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="new Date(item.time).toLocaleString()"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.hash"></v-list-tile-sub-title>
                                <template v-for="(outItem, outIndex) in item.out">
                                    <v-list-tile-sub-title :key="outIndex" v-html="outItem.addr"></v-list-tile-sub-title>
                                </template>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <div>{{ item.result }}</div>
                            </v-list-tile-action>
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
// import qr from 'qr-encode'
// const buffer = new Buffer(JSON.parse(localStorage['blockstack-gaia-hub-config']).address, 'hex')
const btcAddress = JSON.parse(localStorage['blockstack-gaia-hub-config']).address

export default {
  name: 'Summary',
  data: () => ({
    transactions: []
  }),
  mounted () {
    const config = {
      headers: {'Access-Control-Allow-Origin': '*', 'crossDomain': true, 'Content-Type': 'application/json'}
    }
    axios.get('https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/' + btcAddress + '?cors=true', config)
      .then(res => {
        console.log(res)
        console.log(res.data.txs)
        this.transactions = res.data.txs
        // this.coins.filter(item => item.title === 'BTC')[0].amount = res.data
      })
    // this.coins.filter(item => item.title === 'BTC')[0].qrSrc = qr(JSON.parse(localStorage['blockstack-gaia-hub-config']).address, {type: 6, size: 6, level: 'Q'})
  }
}
</script>

<style scoped>
    .qr-image {
        height: 100px;
        width: 100px;
        min-width: 100px;
    }
</style>
