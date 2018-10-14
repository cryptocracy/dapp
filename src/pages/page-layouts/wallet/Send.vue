<template>
    <v-layout row>
        <v-flex xs12 sm8 offset-sm2>
            <v-card class="wallet-card">
                <div class="wallet-title">Send to:</div>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="addressee"
                        :rules="addressRules"
                        :disabled="isLoading"
                        label="Addressee"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="amountPay"
                        label="Amount to pay"
                        :rules="amountRule"
                        suffix="BTC"
                    ></v-text-field>
                    <v-text-field
                        v-model="amountFee"
                        label="Transaction fee"
                        :rules="amountRule"
                        suffix="BTC"
                    ></v-text-field>
                    <div class="fee-title">Recommended fees (in Satoshis)</div>
                    <div class="fee-hints">
                        <div class="fee-hint" v-if="fastestFee">Fastest fee:&nbsp;
                            <span class="fee-amount" @click="setFee(fastestFee)">{{ fastestFee }}</span>
                        </div>
                        <div class="fee-hint" v-if="halfHourFee">30 min fee:&nbsp;
                            <span class="fee-amount" @click="setFee(halfHourFee)">{{ halfHourFee }}</span>
                        </div>
                        <div class="fee-hint" v-if="hourFee">1 hour fee:&nbsp;
                            <span class="fee-amount" @click="setFee(hourFee)">{{ hourFee }}</span>
                        </div>
                    </div>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
const bitcoin = require('bitcoinjs-lib')
const CoinKey = require('coinkey')
const axios = require('axios')

export default {
  name: 'Send',
  data: () => ({
    addressee: '',
    amountPay: '',
    amountFee: '',
    isLoading: false,
    fastestFee: null,
    halfHourFee: null,
    hourFee: null,
    addressRules: [
      v => v ? /^((?!_)[A-z0-9])+$/.test(v) || 'Letters and numbers are only allowed' : true,
      v => v ? v.length <= 34 || 'Please enter proper address' : true,
      v => v ? v.length >= 25 || 'Please enter proper address' : true
    ],
    amountRule: [
      v => v ? /^((?!_)[0-9.])+$/.test(v) || 'Numbers are only allowed' : true
    ],
    valid: false
  }),
  methods: {
    setFee (amount) {
      this.amountFee = (amount / 100000000).toFixed(8)
    }
  },
  mounted () {
    axios.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
      .then((res) => {
        console.log(res.data)
        this.fastestFee = res.data.fastestFee
        this.halfHourFee = res.data.halfHourFee
        this.hourFee = res.data.hourFee
      })
    // var ck = new CoinKey(new Buffer(JSON.parse(localStorage['blockstack']).appPrivateKey))
    //
    //
    // console.log(JSON.parse(localStorage['blockstack']).appPrivateKey)
    // console.log(ck)
    //     console.log(cl.publicAddress)
    const buffer = Buffer.from(JSON.parse(localStorage['blockstack']).appPrivateKey, 'hex')
    const ck = new CoinKey(buffer)
    console.log(ck.publicAddress)
    console.log(ck.privateKey.toString('hex'))
    console.log(ck.privateWif)
    const TestNet = bitcoin.networks.testnet
    // const keyPair = new bitcoin.ECPair.fromWIF(ck.privateWif, bitcoin.networks.bitcoin)
    let privKey = 'cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q'
    let ourWallet = new bitcoin.ECPair.fromWIF(privKey, TestNet)
    // console.log(keyPair)
    console.log(ourWallet)
    // const key = bitcoin.ECPair.fromWIF(JSON.parse(localStorage['blockstack']).appPrivateKey)
    //     const key = bitcoin.ECPair.fromWIF('cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q')
    // const key = bitcoin.ECPair.fromWIF('cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q')
    // console.log(key)
  }
}
</script>

<style scoped>
    .wallet-card {
        padding: 15px 20px;
    }
    .fee-hints {
        display: flex;
    }
    .fee-hint {
        margin-right: 20px;
    }
    .fee-amount {
        cursor: pointer;
        color: #3949AB;
    }
</style>
