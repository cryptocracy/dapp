<template>
  <div>
    <div v-if="userData.hasOwnProperty('profile')" class="container profile-info">
      <v-container fluid="true">
        <v-layout class="br20" row wrap>
          <v-flex  xs12 sm5>
            <v-card class="br20">
              <v-img
                v-if="userData.profile.hasOwnProperty('image')"
                :src="userData.profile.image[0].contentUrl"
                height="150px"
              >
              </v-img>
              <v-img
                v-else
                height="200px"
                src="https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
              </v-img>

              <v-card-title>
                <div class="display-1">{{userData.profile.name}}</div>
                <v-list-tile-action v-if="$route.params.id !== 'my-profile'" class="ml-auto">
                  <v-tooltip bottom v-if="!isAdded">
                    <v-btn slot="activator" @click.stop="updateContacts(userData, 'addition')" outline fab small color="teal accent-4">
                      <v-icon  color="teal accent-4">person_add</v-icon>
                    </v-btn>
                    <span>Add to Contacts</span>
                  </v-tooltip>

                  <v-tooltip bottom v-else>
                    <v-btn slot="activator" @click.stop="updateContacts(userData, 'deletion')" outline fab small color="teal accent-4">
                      <v-icon  color="teal accent-4">delete</v-icon>
                    </v-btn>
                    <span>Remove from Contacts</span>
                  </v-tooltip>
                </v-list-tile-action>

                <v-list two-line>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-tooltip bottom>
                        <v-icon slot="activator" color="teal accent-4">chat</v-icon>
                        <span v-if="$route.params.id !== 'my-profile'"> {{ userData.fullyQualifiedName }} </span>
                        <span v-else> {{ userData.username }} </span>
                      </v-tooltip>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-if="$route.params.id !== 'my-profile'">{{userData.fullyQualifiedName || 'None'}}</v-list-tile-title>
                      <v-list-tile-title v-else>{{userData.username || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Fully Qualified Name</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider inset></v-divider>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="teal accent-4">mail</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>{{userData.profile['@type'] || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Type</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action><v-icon>account_box</v-icon></v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-if="userData.profile.hasOwnProperty('account')" >{{userData.profile.account.length || 0}}</v-list-tile-title>
                      <v-list-tile-sub-title>Account</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex  xs12 sm7>
            <v-card class="br20">
              <v-card-title>
                <div class="headline">Account Resources</div>
              </v-card-title>
              <v-card-text>
              </v-card-text>
              <v-list>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="teal accent-4">fa-qrcode</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content >
                    <v-btn dark block color="teal accent-4" @click="eventBus.$emit('showBTCAddress', {qrSrc, address})" class="br20">Show BTC Address</v-btn>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset dark></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="teal accent-4">fa-bitcoin</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content >
                    <v-btn
                      :disabled="$route.params.id === 'my-profile' || !hasBTCProof"
                      block color="teal accent-4"
                      :dark="hasBTCProof && $route.params.id !== 'my-profile'"
                      class="br20"
                      @click="redirectUser"
                    >
                      Pay with BTC
                    </v-btn>
                  </v-list-tile-content>
                  <!-- <span v-if="$route.params.id === 'my-profile'">You don't want to pay to yourself.</span>
                  <span v-else-if="!hasBTCProof">This user doesn't have a BTC proff setup with Blockstack.</span>
                  <span v-else>You can directly pay this user from your wallet.</span> -->
                </v-list-tile>
                <v-divider inset dark></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="teal accent-4">fa-rocket</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content >
                    <v-btn
                      dark block color="teal accent-4"
                      class="br20"
                      @click="eventBus.$emit('payWithAltcoins')"
                    >
                      Pay with altcoin
                    </v-btn>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-list>

              <v-list two-line>
                <v-list-tile @click="redirectToResources('OwnedImages')">
                  <v-list-tile-action>
                    <v-icon color="teal accent-4">photo</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{resources.images}}</v-list-tile-title>
                    <v-list-tile-sub-title>Images Count</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="redirectToResources('Owned')">
                  <v-list-tile-action>
                    <v-icon color="teal accent-4">label</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{resources.tags}}</v-list-tile-title>
                    <v-list-tile-sub-title>Tags Count</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="redirectToResources('OwnedMarkers')">
                  <v-list-tile-action><v-icon color="teal accent-4">place</v-icon></v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title >{{resources.markers}}</v-list-tile-title>
                    <v-list-tile-sub-title>Markers Count</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </div>
    <div class="mt-5 text-xs-center" v-else-if="!isResolved">
      <v-progress-circular
        :size="70"
        :width="5"
        color="teal accent-4"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else class="mt-5 text-xs-center">
      <h1>No contacts found</h1>
    </div>
    <modals></modals>
  </div>

</template>

<script>
import { eventBus } from '@/main'
import { mapGetters } from 'vuex'
import qrEncode from 'qr-encode'
import modals from '@/components/modals/profile-modals'
import contactService from '@/services/contacts'
import axios from 'axios'
// import { marker } from 'leaflet';

export default {
  name: 'Profile',
  data: () => ({
    // qrSrc: '',
    // address: '',
    resources: {
      tags: 0,
      markers: 0,
      images: 0
    },
    eventBus: eventBus
  }),
  components: {
    modals
  },
  computed: {
    ...mapGetters({
      profileData: 'getProfileData',
      contacts: 'getContacts',
      searchedUserProfileData: 'getUserProfileData',
      isResolved: 'isResolved',
      isRedirected: 'isRedirected'
    }),
    // computed property for showing searched user profile data or user's own profile data
    userData () {
      return this.searchedUserProfileData || this.profileData
    },
    // computed property for showing addition/deletion button
    isAdded () {
      if (this.contacts.length > 0) {
        return this.contacts.find((item) => {
          return item.fullyQualifiedName === this.searchedUserProfileData.fullyQualifiedName
        })
      } else return false
    },
    hasBTCProof () {
      if (this.searchedUserProfileData && this.searchedUserProfileData.hasOwnProperty('profile') && Array.isArray(this.searchedUserProfileData.profile.account)) {
        return this.searchedUserProfileData.profile.account.find(account => account.service.toLowerCase() === 'bitcoin')
      } else {
        return false
      }
    },
    hubUrl () {
      if (this.searchedUserProfileData && this.searchedUserProfileData.hasOwnProperty('profile') && typeof this.searchedUserProfileData.profile.apps === 'object') {
        let url = this.searchedUserProfileData.profile.apps[window.location.origin] || this.searchedUserProfileData.profile.apps['https://dapp_cryptocracy_io']
        this.getResourceCount(url)
        return url
      } else if (this.$route.params.id !== 'my-profile') {
        this.getResourceCount(null)
        return null
      } else {
        let url = this.profileData.profile.apps[window.location.origin] || this.profileData.profile.apps['https://dapp_cryptocracy_io']
        this.getResourceCount(url)
        return url
      }
    },
    address () {
      if (this.hasBTCProof) {
        return this.hasBTCProof.identifier
      } else {
        return null
      }
    },
    qrSrc () {
      if (this.address) {
        return qrEncode(this.address, {type: 6, size: 6, level: 'Q'})
      } else {
        return null
      }
    }
  },
  watch: {
    deep: true,
    // this is necessary, do not remove it
    hubUrl () {
    }
  },
  mixins: [contactService],
  created () {
    // method from contactService mixin
    this.getContacts()
    // searching for user profile via params in current route when its not user own profile
    // isRedirected added to stop searching for profiles when user is being redirected from another page by clicking on the user link
    if (this.$route.params.id !== 'my-profile' && !this.isRedirected) {
      let searchObj = {
        endpoint: 'search',
        query: this.$route.params.id,
        isAbsolute: this.$route.params.id.split('.').length > 1
      }
      this.$store.commit('MUTATION_SET_SEARCH_RESULT', [])
      this.$store.commit('MUTATION_SET_USER', {})
      this.$store.dispatch('ACTION_GET_SEARCH_RESULT', searchObj)
    }
    // if (localStorage['blockstack-gaia-hub-config']) {
    //   this.address = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
    //   this.qrSrc = qrEncode(this.address, {type: 6, size: 6, level: 'Q'})
    // }
  },
  methods: {
    redirectUser () {
      this.$store.state.pay_to = this.searchedUserProfileData
      this.$router.push({name: 'Send'})
    },
    redirectToResources (resource) {
      this.$store.state.hubUrl = this.hubUrl
      this.$router.push({name: resource})
    },
    async getResourceCount (url) {
      if (url) {
        axios.get(url + 'my_tags.json').then(res => {
          this.resources.tags = Object.keys(res.data).length
        })
          .catch(e => {
            this.resources.tags = 0
          })
        axios.get(url + 'my_markers.json').then(res => {
          this.resources.markers = Object.keys(res.data).length
        })
          .catch(e => {
            this.resources.markers = 0
          })
        axios.get(url + 'my_images.json').then(res => {
          this.resources.images = Object.keys(res.data).length
        })
          .catch(e => {
            this.resources.images = 0
          })
        // let [a, b, c] = [await tags, await markers, await images]
      } else {
        Object.keys(this.resources).forEach(element => {
          this.resources[element] = 0
        })
      }
    }
  },
  destroyed () {
    this.$store.commit('MUTATION_SET_REDIRECTION_STATE', false)
  }
}
</script>
<style lang="scss" scoped>
.profile-info {
  .headline {
  color: #5a5d5f
  }
  h3{
    color: grey
  }
}
.br20 {
  border-radius: 20px
}
.qr-code {
  margin: 1% 0% 3% 0%
}
.ml25 {
  margin-left: 1em
}
.si {
  .v-icon {
  font-size: 15px !important
  }
}

</style>
