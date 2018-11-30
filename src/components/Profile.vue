<template>
  <div>
    <div v-if="userData.hasOwnProperty('profile')" class="container profile-info">
      <!-- do not delete -->
      <!-- <div> -->
      <!-- <div class="offset-2 col-6 ">></div> -->
      <v-container fluid="true">
        <v-layout class="br20" row wrap>
          <!-- <v-flex xs12 sm6 md8 offset-sm3 align-center justify-center>
            <v-avatar :size="150" color="grey lighten-4">
              <img v-if="userData.profile.hasOwnProperty('image')" :src="userData.profile.image[0].contentUrl" :alt="userData.profile.name">
              <v-icon v-else large color="teal accent-4">person</v-icon>
            </v-avatar>
            <h1>Akash kaushik</h1>
          </v-flex> -->
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
                        <v-icon slot="activator" color="teal accent-4">person</v-icon>
                        <span v-if="$route.params.id !== 'my-profile'"> {{ userData.fullyQualifiedName }} </span>
                        <span v-else> {{ userData.username }} </span>
                      </v-tooltip>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-if="$route.params.id !== 'my-profile'">{{userData.fullyQualifiedName || 'None'}}</v-list-tile-title>
                      <v-list-tile-title v-else>{{userData.username || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Fully Qualified Name</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
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
                <v-expansion-panel @click="dummyFunction">
                  <v-expansion-panel-content>
                    <div slot="header">
                      <v-icon color="teal accent-4">fa-qrcode</v-icon>
                      <span class="ml25">BTC Address</span>
                    </div>
                    <div class="text-xs-center" >
                      <p >Address: {{address}}</p>
                      <img class="qr-code" :height="imageSize" :src="qrSrc">
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card-text>
              <v-list two-line>
                <!-- <v-list-group>

                  <v-list-tile slot="activator">
                    <v-list-tile-action>
                      <v-icon color="teal accent-4">fa-qrcode</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Show</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <img :src="qrSrc">
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group> -->

                <!-- <v-list-tile @click="dummyFunction">
                  <v-list-tile-action>
                    <v-icon>
                      account_circle
                    </v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{userData.username || 'None'}}</v-list-tile-title>
                    <v-list-tile-sub-title>Username</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon>chat</v-icon>
                  </v-list-tile-action>
                </v-list-tile> -->

                <!-- <v-divider inset></v-divider> -->

                <v-list-tile @click="dummyFunction">
                  <v-list-tile-action>
                    <v-icon color="teal accent-4">label</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>2</v-list-tile-title>
                    <v-list-tile-sub-title>Tags Count</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="dummyFunction">
                  <v-list-tile-action><v-icon color="teal accent-4">place</v-icon></v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title v-if="userData.profile.hasOwnProperty('account')" >{{userData.profile.account.length || 0}}</v-list-tile-title>
                    <v-list-tile-sub-title>Markers Count</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
      <!-- </div> -->
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
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import qrEncode from 'qr-encode'
import contactService from '@/services/contacts'

export default {
  name: 'Profile',
  data: () => ({
    qrSrc: '',
    address: ''
  }),
  computed: {
    ...mapGetters({
      profileData: 'getProfileData',
      contacts: 'getContacts',
      searchedUserProfileData: 'getUserProfileData',
      isResolved: 'isResolved',
      isRedirected: 'isRedirected'
    }),
    imageSize () {
      // breakpoints to dynamically resizing profile image
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '80px'
        case 'sm': return '200px'
        default: return '246px'
      }
    },
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
    if (localStorage['blockstack-gaia-hub-config']) {
      this.address = JSON.parse(localStorage['blockstack-gaia-hub-config']).address
      this.qrSrc = qrEncode(this.address, {type: 6, size: 6, level: 'Q'})
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
