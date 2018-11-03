<template>
  <v-layout row v-if="!stateIsLoading">
    <v-flex xs12 sm8 offset-sm2>
      <v-card class="wallet-card"></v-card>
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
              :disabled="isLoading"
              :rules="amountRule"
              suffix="BTC (in Satoshi)"
          ></v-text-field>
          <v-text-field
              v-model="amountFee"
              label="Transaction fee"
              :disabled="isLoading"
              :rules="amountRule"
              suffix="Satoshi/byte"
          ></v-text-field>
          <div class="fee-title" v-if="fastestFee || halfHourFee || hourFee">Recommended fees (in Satoshis per byte)</div>
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
import { mapGetters } from 'vuex'
const bitcoin = require('bitcoinjs-lib')
const CoinKey = require('coinkey')
const axios = require('axios')
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/'

export default {
  name: 'Send',
  data: () => ({
    addressPublic: '',
    addressee: null,
    amountPay: null,
    amountFee: null,
    isLoading: false,
    fastestFee: null,
    halfHourFee: null,
    hourFee: null,
    addressData: null,
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
  computed: {
    ...mapGetters({
      stateIsLoading: 'isLoading'
    })
  },
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
      let tx = new bitcoin.TransactionBuilder()
      for (let txData of this.addressData.txs) {
        console.log('------')
        console.log(txData)
        console.log('------')

        for (let out of txData.out) {
          console.log(out)
          if (!out.spent && out.addr === this.addressPublic) {
            tx.addInput(txData.hash, +out.n)
            console.log('new input')
          }
        }
      }
      tx.addOutput(this.addressee, +this.amountPay)
      tx.addOutput(this.addressPublic, this.addressData.final_balance - this.amountPay - this.amountFee * (tx.__tx.ins.length * 148 + (tx.__tx.outs.length + 1) * 34 + 10 - tx.__tx.ins.length))
      console.log(tx)
      const buffer = Buffer.from(JSON.parse(localStorage['blockstack']).appPrivateKey, 'hex')
      const ck = new CoinKey(buffer) // eslint-disable-next-line
      let keyPair = new bitcoin.ECPair.fromWIF(ck.privateWif, bitcoin.networks.bitcoin)
      for (let inputIndex in tx.__inputs) {
        console.log(inputIndex)
        tx.sign(+inputIndex, keyPair)
      }
      let txHex = tx.build().toHex()
      let bodyFormData = new FormData()
      bodyFormData.append('tx', txHex)
      const config = {
        headers: {
          'Content-Type': ' multipart/form-data'
        }
      }
      axios.post('https://blockchain.info/pushtx?cors=true', bodyFormData, config)
        .then((res) => {
          console.log(res)
          this.isLoading = false
          this.clear()
        })
    }
  },
  mounted () {
    this.$store.commit('toggleLoading')
    this.addressPublic = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
    //  get info about wallet address
    axios.get(apiUrl + this.addressPublic)
      .then((res) => {
        console.log('------')
        console.log(res)
        console.log('------')
        this.addressData = res.data
        this.$store.commit('toggleLoading')
      })
    //  get info about tx fees
    axios.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
      .then((res) => {
        this.fastestFee = res.data.fastestFee
        this.halfHourFee = res.data.halfHourFee
        this.hourFee = res.data.hourFee
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
