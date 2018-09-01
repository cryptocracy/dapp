<template>
  <div>
    <div v-if="userData.hasOwnProperty('profile')" class="container profile-info">
      <div class="row align-items-center">
        <div class="offset-1 col-3">
          <v-avatar :size="imageSize" color="grey lighten-4">
            <img :src="userData.profile.image[0].contentUrl" :alt="userData.profile.name">
          </v-avatar>
        </div>
        <div class="offset-2 col-6 ">
          <v-layout row>
            <v-flex>
              <v-card>
                <v-card-title class="">
                  <div class="display-1">{{userData.profile.name}}</div>
                </v-card-title>

                <v-list two-line>
                  <v-list-tile @click="dummyFunc">
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

                  <v-list-tile @click="dummyFunc">
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

                  <v-list-tile @click="dummyFunc">
                    <v-list-tile-action>
                      <v-icon color="teal accent-4">mail</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>{{userData.profile['@type'] || 'None'}}</v-list-tile-title>
                      <v-list-tile-sub-title>Type</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile @click="dummyFunc">
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

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
// import { eventBus } from '../main';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      profileData: 'getProfileData',
      contactUserData: 'getContactData'
    }),
    imageSize () {
      // console.log(this.profileData)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '80px'
        case 'sm': return '200px'
        default: return '256px'
      }
    },
    newUserData () {
      return this.contactUserData || this.profileData
    }
  },
  watch: {
    newUserData () {
      this.userData = this.newUserData
    }
  },
  props: ['userProfileData'],
  data: () => ({
    name: 'Akash',
    userData: {}
  }),
  methods: {
    dummyFunc () {}
  },
  mounted () {
    this.userData = this.contactUserData || this.profileData
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
