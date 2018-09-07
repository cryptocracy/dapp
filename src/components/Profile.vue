<template>
  <div>
    <div v-if="userData.hasOwnProperty('profile')" class="container profile-info">
      <div class="row align-items-center">
        <div class="offset-1 col-3">
          <v-avatar :size="imageSize" color="grey lighten-4">
            <img v-if="userData.profile.hasOwnProperty('image')" :src="userData.profile.image[0].contentUrl" :alt="userData.profile.name">
            <v-icon v-else large color="teal accent-4">person</v-icon>
          </v-avatar>
        </div>
        <div class="offset-2 col-6 ">
          <v-layout row>
            <v-flex>
              <v-card>
                <v-card-title class="">
                  <div class="display-1">{{userData.profile.name}}</div>
                  <v-list-tile-action v-if="$route.params.id !== 'my-profile'" class="ml-auto">
                    <v-tooltip bottom v-if="!isAdded">
                      <v-btn slot="activator" @click.stop="updateContacts(userData, 'addition')" outline fab small color="teal accent-4">
                        <v-icon  large color="teal accent-4">person_add</v-icon>
                      </v-btn>
                      <span>Add to Contacts</span>
                    </v-tooltip>

                    <v-tooltip bottom v-else>
                      <v-btn slot="activator" @click.stop="updateContacts(userData, 'deletion')" outline fab small color="teal accent-4">
                        <v-icon  large color="teal accent-4">delete</v-icon>
                      </v-btn>
                      <span>Remove from Contacts</span>
                    </v-tooltip>
                  </v-list-tile-action>
                </v-card-title>

                <v-list two-line>
                  <v-list-tile @click="dummyFunction">
                    <v-list-tile-action>
                      <v-icon color="teal accent-4">person</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>{{userData.fullyQualifiedName || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Fully Qualified Name</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-list-tile @click="dummyFunction">
                    <v-list-tile-action></v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>{{userData.username || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Username</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile @click="dummyFunction">
                    <v-list-tile-action>
                      <v-icon color="teal accent-4">mail</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>{{userData.profile['@type'] || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Type</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile @click="dummyFunction">
                    <v-list-tile-action></v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-if="userData.profile.hasOwnProperty('account')" >{{userData.profile.account.length || 0}}</v-list-tile-title>
                      <v-list-tile-sub-title>Account</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </div>
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
import contactService from '@/services/contacts'

export default {
  name: 'Profile',
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
        default: return '256px'
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
  },
  destroyed () {
    this.$store.commit('MUTATION_SET_REDIRECTION_STATE', false)
  }
}
</script>
<style lang="scss" scoped>
.profile-info {
  h1 {
  color: #5a5d5f
  }
  h3{
    color: grey
  }
}
</style>
