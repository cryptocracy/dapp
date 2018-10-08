<!--<template>-->
    <!--<v-layout row>-->
        <!--<v-flex xs12 sm8 offset-sm2>-->
            <!--<v-card>-->
                <!--<v-list three-line>-->
                    <!--<v-list-tile-->
                        <!--avatar-->
                    <!--&gt;-->
                        <!--<v-list-tile-avatar>-->
                            <!--<img :src="imgLink">-->
                        <!--</v-list-tile-avatar>-->

                        <!--<v-list-tile-content>-->
                            <!--<v-list-tile-title v-html="title"></v-list-tile-title>-->
                            <!--<v-list-tile-sub-title v-html="address"></v-list-tile-sub-title>-->
                        <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->
                    <!--<v-list-tile>-->
                        <!--<v-list-tile-action>-->
                            <!--&lt;!&ndash;<img src="https://www.kortado-bhp.pl/galeria/plaszcz-przeciwdeszczowy-z-poliestru.1.1.jpg" class="qr-image">&ndash;&gt;-->
                            <!--<img :src="qrSrc" class="qr-image">-->
                        <!--</v-list-tile-action>-->
                    <!--</v-list-tile>-->
                <!--</v-list>-->
            <!--</v-card>-->
        <!--</v-flex>-->
    <!--</v-layout>-->
<!--</template>-->

<!--<script>-->
<!--// import storageService from '../../../services/blockstack-storage'-->
<!--import CoinKey from 'coinkey'-->
<!--import axios from 'axios'-->
<!--import qr from 'qr-encode'-->
<!--// const buffer = new Buffer(JSON.parse(localStorage['blockstack-gaia-hub-config']).address, 'hex')-->
<!--const btcAddress = JSON.parse(localStorage['blockstack-gaia-hub-config']).address-->
<!--const username = JSON.parse(localStorage['blockstack']).username-->

<!--export default {-->
  <!--name: 'Summary',-->
  <!--data: () => ({-->
    <!--address: btcAddress,-->
    <!--amount: '',-->
    <!--imgLink: '',-->
    <!--qrSrc: ''-->
  <!--}),-->
  <!--computed: {-->
    <!--title () {-->
      <!--return 'd'-->
    <!--}-->
  <!--},-->
  <!--mounted () {-->
    <!--const buffer = new Buffer(JSON.parse(localStorage['blockstack']).appPrivateKey, 'hex')-->
    <!--const ck = new CoinKey(buffer)-->
    <!--console.log(ck.publicAddress)-->
    <!--console.log(JSON.parse(localStorage['blockstack-gaia-hub-config']).address)-->
    <!--axios.get('https://blockchain.info/q/addressbalance/' + btcAddress)-->
      <!--.then(res => {-->
        <!--console.log(res)-->
        <!--this.amount = res.data-->
      <!--})-->
    <!--axios.get('https://core.blockstack.org/v1/names/' + username)-->
      <!--.then(res => {-->
        <!--console.log(res)-->
        <!--// this.coins.filter(item => item.title === 'BTC')[0].amount = res.data-->
      <!--})-->
    <!--this.qrSrc = qr(JSON.parse(localStorage['blockstack-gaia-hub-config']).address, {type: 6, size: 6, level: 'Q'})-->
  <!--}-->
<!--}-->
<!--</script>-->
<template>
<wallet-template>
    <!--<template slot="balance-title">-->
        <!--<v-list-tile-sub-title class="coin-sub-title">balance:&nbsp;&nbsp;</v-list-tile-sub-title>-->
    <!--</template>-->
    <!--<template slot="balance">-->
    <template slot="qr">
        <img :src="qrSrc" class="qr-image">
    </template>
</wallet-template>
</template>

<script>
import qr from 'qr-encode'
import WalletTemplate from './WalletTemplate'

export default {
  name: 'Summary',
  data: () => ({
    qrSrc: ''
  }),
  components: {
    WalletTemplate
  },
  mounted () {
    this.qrSrc = qr(JSON.parse(localStorage['blockstack-gaia-hub-config']).address, {type: 6, size: 6, level: 'Q'})
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
