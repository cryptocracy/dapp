<template>
    <v-layout row>
        <v-flex xs12 sm8 offset-sm2>
            <v-card>
                <v-list three-line>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-icon class="coin-icon">fa-{{ icon }}</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-sub-title class="coin-sub-title">coin:&nbsp;&nbsp;</v-list-tile-sub-title>
                            <v-list-tile-sub-title class="coin-sub-title">address:&nbsp;&nbsp;</v-list-tile-sub-title>
                            <!--<v-list-tile-sub-title class="coin-sub-title">balance:&nbsp;&nbsp;</v-list-tile-sub-title>-->
                            <slot name="balance-title"></slot>
                        </v-list-tile-content>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="title"></v-list-tile-title>
                            <v-list-tile-title v-html="address"></v-list-tile-title>
                            <!--<v-list-tile-title v-html="amount"></v-list-tile-title>-->
                            <slot name="balance"></slot>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <slot name="qr"></slot>
                    </v-list-tile>
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
const username = JSON.parse(localStorage['blockstack']).username

export default {
  name: 'Summary',
  data: () => ({
    title: '',
    address: btcAddress,
    amount: '',
    icon: ''
  }),
  mounted () {
    axios.get('https://blockchain.info/q/addressbalance/' + btcAddress)
      .then(res => {
        this.amount = res.data + ''
      })
    axios.get('https://core.blockstack.org/v1/names/' + username)
      .then(res => {
        this.icon = res.data.blockchain
        this.title = res.data.blockchain
      })
  }
}
</script>

<style scoped>
    .coin-sub-title {
        height: 24px;
        display: flex;
        align-items: center;
        padding-bottom: 1px;
    }
    .coin-icon {
        font-size: 50px;
    }
    @media only screen and (max-width: 786px) {
        .coin-sub-title {
            display: none;
        }
    }
</style>
