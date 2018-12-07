<template>
  <v-layout row v-if="!stateIsLoading">
    <v-flex xs12 sm8 offset-sm2>
      <v-card class="wallet-card wallet-card--balance">
        Current balance: {{ this.addressData.final_balance }} satoshi
      </v-card>
      <v-card class="wallet-card">
        <div class="wallet-title">Send to:</div>
        <v-form ref="form" lazy-validation>
          <v-combobox
            v-model="selectedContact"
            :items="filteredContactList"
            item-text="fullyQualifiedName"
            item-value="btcAddress"
            :disabled="isLoading"
            chips
            label="Select from contacts"
            hint="Showing contacts which has BTC address associated with them."
            :persistent-hint="true"
          >
            <template v-if="selectedContact && typeof selectedContact === 'object' && Object.keys(selectedContact).length > 0" slot="selection" slot-scope="data">
              <v-chip
                color="#1ebea5c7"
                text-color="white"
                :selected="data.selected"
                :disabled="data.disabled"
                :key="JSON.stringify(data.item)"
                :close="true"
                @input="selectedContact = {}"
              >
                <!-- Image will be shown in the chip, if there is not an image then the first character avatar of the user will be shown. -->
                <v-avatar v-if="data.item.hasOwnProperty('profile') && data.item.profile.hasOwnProperty('image')">
                  <img :src="data.item.profile.image[0].contentUrl" alt="avatar">
                </v-avatar>
                <v-avatar v-else class="primary white--text">
                  {{ typeof data.item === 'object' ? data.item.fullyQualifiedName.slice(0, 1).toUpperCase() : ''}}
                </v-avatar>
                {{ data.item.fullyQualifiedName }}
              </v-chip>
            </template>
          </v-combobox>

          <p class="mt-3">Or directly enter the address</p>

          <v-text-field
            v-model="addressee"
            :rules="addressRules"
            :disabled="isLoading"
            label="BTC Address"
            hint="This field will be read-only if you select the contact from above dropdown"
            :persistent-hint="true"
            :readonly="selectedContact && typeof selectedContact === 'object' && Object.keys(selectedContact).length > 0"
            requiredpo
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
import contactService from '@/services/contacts'
const bitcoin = require('bitcoinjs-lib')
const CoinKey = require('coinkey')
const axios = require('axios')
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/'

export default {
  name: 'Send',
  data: () => ({
    filteredContactList: [],
    selectedContact: {},
    addressPublic: '',
    addressee: null,
    amountPay: null,
    amountFee: null,
    isLoading: false,
    fastestFee: null,
    halfHourFee: null,
    hourFee: null,
    addressData: {},
    addressRules: [
      v => v ? /^((?!_)[A-z0-9])+$/.test(v) || 'Letters and numbers are only allowed' : true,
      v => v ? v.length <= 34 || 'Please enter proper address' : true,
      v => v ? v.length >= 25 || 'Please enter proper address' : true
    ],
    amountRule: [
      v => v ? /^((?!_)[0-9.])+$/.test(v) || 'Numbers are only allowed' : true
    ]
  }),
  mixins: [contactService],
  computed: {
    ...mapGetters({
      stateIsLoading: 'isLoading',
      contactList: 'getContacts'
    }),
    valid () {
      return this.addressee && this.amountPay && this.amountFee
    }
  },
  watch: {
    deep: true,
    contactList () {
      if (this.contactList.length > 0) {
        this.getFilteredContactList(this.contactList)
      }
    },
    selectedContact () {
      if (this.selectedContact && typeof this.selectedContact === 'object' && Object.keys(this.selectedContact).length > 0) {
        this.getUserDetails()
      } else {
        this.addressee = null
      }
    }
  },
  methods: {
    // method to filter contact on the basis of if there is any btc address found in their account.
    getFilteredContactList (contactList) {
      this.filteredContactList = []
      contactList.forEach(contact => {
        this.filterByService({ contact, createList: true })
      })
    },
    // filtering contacts if they have bitcoin service associated
    filterByService (args) {
      let { contact, createList } = args
      if (contact.hasOwnProperty('profile') && Array.isArray(contact.profile.account)) {
        contact.profile.account.find(account => {
          if (account.service.toLowerCase() === 'bitcoin') {
            // filling conatct list array if createList is true
            createList && this.fillContactList(contact, account)
            !createList && (this.addressee = account.identifier)
          }
        })
      }
    },
    fillContactList (contact, account) {
      let modifiedContactObject = Object.assign({}, contact)
      this.$set(modifiedContactObject, 'addressee', account.identifier)
      this.filteredContactList.push(modifiedContactObject)
    },
    async getUserDetails () {
      this.$store.commit('toggleLoading')
      let query = this.selectedContact.fullyQualifiedName || this.selectedContact.username
      let user = await this.$store.dispatch('ACTION_GET_USER', {
        query,
        endpoint: `https://core.blockstack.org/v1/users/${query}`
      })
      this.$store.commit('toggleLoading')
      this.filterByService({ contact: user, createList: false })
    },
    setFee (amount) {
      this.amountFee = amount
    },
    clear () {
      this.selectedContact = {}
      this.addressee = null
      this.amountPay = null
      this.amountFee = null
    },
    submit () {
      this.isLoading = true
      let tx = new bitcoin.TransactionBuilder()
      for (let txData of this.addressData.txs) {
        for (let out of txData.out) {
          if (!out.spent && out.addr === this.addressPublic) {
            tx.addInput(txData.hash, +out.n)
          }
        }
      }
      tx.addOutput(this.addressee, +this.amountPay)
      tx.addOutput(this.addressPublic, this.addressData.final_balance - this.amountPay - this.amountFee * (tx.__tx.ins.length * 148 + (tx.__tx.outs.length + 1) * 34 + 10 - tx.__tx.ins.length))
      const buffer = Buffer.from(JSON.parse(localStorage['blockstack']).appPrivateKey, 'hex')
      const ck = new CoinKey(buffer) // eslint-disable-next-line
      let keyPair = new bitcoin.ECPair.fromWIF(ck.privateWif, bitcoin.networks.bitcoin)
      for (let inputIndex in tx.__inputs) {
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
          this.isLoading = false
          this.clear()
        })
    }
  },
  mounted () {
    if (Object.keys(this.$store.state.pay_to).length > 0) {
      this.selectedContact = this.$store.state.pay_to
    }
    if (this.$store.state.BTCAddress) {
      this.addressee = this.$store.state.BTCAddress
    }
    this.getFilteredContactList(this.contactList)
    this.$store.commit('toggleLoading')
    this.addressPublic = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
    //  get info about wallet address
    axios.get(apiUrl + this.addressPublic)
      .then((res) => {
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
  },
  created () {
    // method from contactService mixin
    this.getContacts()
  },
  destroyed () {
    this.$store.state.BTCAddress = null
    this.$store.state.pay_to = {}
  }
}
</script>

<style lang="scss" scoped>
    .wallet-card {
        padding: 15px 20px;

        .form-buttons {
            margin-left: -7px;
        }

        &.wallet-card--balance {
          margin-bottom: 20px;
          text-align: right;
          font-size: 16px;
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
