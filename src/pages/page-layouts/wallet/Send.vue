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
                    <div class="fee-title" v-if="fastestFee || halfHourFee || hourFee">Recommended fees (in Satoshis)</div>
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
                    <div class="form-buttons">
                        <v-btn
                        :disabled="!valid || isLoading"
                        @click="submit"
                    >
                        send
                    </v-btn>
                        <v-btn
                            @click="clear"
                            :disabled="isLoading"
                        >
                            clear
                        </v-btn>
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
const TestNet = bitcoin.networks.testnet
let privKey = 'cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q'
const pubKey = 'mqVKYrNJcMkdK2QHFNEd1P6Qfc1Sqs3hu1'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'

export default {
  name: 'Send',
  data: () => ({
    addressee: null,
    amountPay: null,
    amountFee: null,
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
    },
    clear () {
      this.addressee = null
      this.amountPay = null
      this.amountFee = null
    },
    submit () {
      let tx = new bitcoin.TransactionBuilder(TestNet)
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
    // const buffer = Buffer.from(JSON.parse(localStorage['blockstack']).appPrivateKey, 'hex')
    // const buffer = Buffer.from(privKey, 'hex')
    // const ck = new CoinKey(buffer)
    // console.log(ck.publicAddress)
    // console.log(ck.privateKey.toString('hex'))
    // console.log(ck.privateWif)
    // const keyPair = new bitcoin.ECPair.fromWIF(ck.privateWif, bitcoin.networks.bitcoin)
    // let keyPair = new bitcoin.ECPair.fromWIF(privKey, TestNet)
    // let keyPair = bitcoin.ECPair.makeRandom({ network: TestNet })
    var key = bitcoin.ECKey.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
    console.log(key.pub.getAddress().toString())
    // console.log(keyPair)
    // console.log(bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }))
    // console.log(keyPair.getAddress())
    // const key = bitcoin.ECPair.fromWIF(JSON.parse(localStorage['blockstack']).appPrivateKey)
    //     const key = bitcoin.ECPair.fromWIF('cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q')
    // const key = bitcoin.ECPair.fromWIF('cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q')
    // console.log(key)
    // console.log(ourWallet.toWIF())
    axios.get(apiUrl + keyPair.publicKey.toString('hex') + '/utxo')
      .then((res) => {
        console.log('------')
        console.log(res)
        console.log('------')
      })
  }
}
</script>

<style lang="scss" scoped>
    .wallet-card {
        padding: 15px 20px;

        .form-buttons {
            margin-left: -7px;
        }
    }
    .wallet-title {
        font-size: 24px;
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
