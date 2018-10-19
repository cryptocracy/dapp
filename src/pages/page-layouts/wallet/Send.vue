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
                        suffix="BTC (in Satoshi)"
                    ></v-text-field>
                    <v-text-field
                        v-model="amountFee"
                        label="Transaction fee"
                        :rules="amountRule"
                        suffix="BTC (in Satoshi)"
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
// const addressPublic = 'mqVKYrNJcMkdK2QHFNEd1P6Qfc1Sqs3hu1'
const addressPublic = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
const addressPublic2 = 'minnXa8Qarg5WbxPQg3vjLZdpbZGHavCzC'
// let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/'
let amountOwn = 0
let txItem

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
      this.amountFee = amount
    },
    clear () {
      this.addressee = null
      this.amountPay = null
      this.amountFee = null
    },
    submit () {
      this.isLoading = true
      // let tx = new bitcoin.TransactionBuilder(TestNet)
      let tx = new bitcoin.TransactionBuilder(bitcoin)
      tx.addInput(txItem.hash, 0)
      tx.addOutput(this.addressee, +this.amountPay)
      tx.addOutput(addressPublic, +txItem.satoshis - this.amountPay - this.amountFee)
      // let keyPair = new bitcoin.ECPair.fromWIF(privKey, TestNet)
      let keyPair = new bitcoin.ECPair.fromWIF(JSON.parse(localStorage['blockstack']).appPrivateKey, bitcoin)
      tx.sign(0, keyPair)
      let tx_hex = tx.build().toHex()
      console.log('our beautiful transaction: ', tx_hex)
      axios.post('https://blockchain.info/api/tx/send', {rawtx: tx_hex})
        .then((res) => {
          console.log(res)
          this.isLoading = false
          this.clear()
        })
    }
  },
  mounted () {
    axios.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
      .then((res) => {
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
    // const buffer = Buffer.from(privKey, 'hex')
    const ck = new CoinKey(buffer)
    console.log('public ' + ck.publicAddress)
    console.log('private ' + ck.privateKey.toString('hex'))
    console.log('private wif ' + ck.privateWif)
    const keyPair = new bitcoin.ECPair.fromWIF(ck.privateWif, bitcoin.networks.bitcoin)
    // let keyPair = new bitcoin.ECPair.fromWIF(privKey, TestNet)
    // let keyPair = bitcoin.ECPair.makeRandom({ network: TestNet })
    // console.log(keyPair.getAddress())
    let publicKey = keyPair.publicKey.toString('hex');
    let { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    let privateKey = keyPair.toWIF()
    console.log('Public: ' + publicKey + ' \nPrivate: ' + privateKey + ' \Address: ' + address)
    // var key = bitcoin.ECKey.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
    // console.log(key.pub.getAddress().toString())
    // console.log(keyPair)
    // console.log(bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }))
    // console.log(keyPair.getAddress())
    // const key = bitcoin.ECPair.fromWIF(JSON.parse(localStorage['blockstack']).appPrivateKey)
    // const key = bitcoin.ECPair.fromWIF('cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q')
    // const key = bitcoin.ECPair.fromWIF('cTEAh2DsC7KE4mzY5YFTYommzr7czbdiBfLPsXZrF6o3zSQLLw9Q')
    // console.log(key)
    // console.log(ourWallet.toWIF())
    axios.get(apiUrl + addressPublic)
      .then((res) => {
        console.log('------')
        console.log(res)
        // let txs = res.data.sort((prev, next) => next.amount - prev.amount)
        // amountOwn = txs[0].amount
        // console.log(txs)
        txItem = res.data.txs[0]
        // console.log(txItem.txid)
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
