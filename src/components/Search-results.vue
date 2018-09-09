<template>
  <div class="container">
    <div>
      <div>
        <v-layout v-if="searchResult.length > 0 && isResolved" row>
          <v-flex xs12 sm8 offset-sm2>
            <v-card>
              <v-subheader>Search Results</v-subheader>
              <v-list two-line>
                <template v-for="(item, index) in searchResult">
                  <v-divider
                    v-if="index !== 0"
                    :inset="true"
                    :key="index"
                  ></v-divider>

                  <v-list-tile
                    :key="item.index"
                    avatar
                    @click="showContactProfile(item)">

                    <!-- <v-btn outline fab small color="teal accent-4"><v-icon  large @click="addToContacts(item)" color="teal accent-4">checked</v-icon></v-btn> -->
                    <v-list-tile-avatar class="ml-2">
                      <img v-if="item.profile.hasOwnProperty('image')" :src="item.profile.image[0].contentUrl">
                      <v-icon v-else large color="teal accent-4">person</v-icon>

                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.fullyQualifiedName"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.profile.name"></v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-tooltip bottom v-if="!addedContacts.hasOwnProperty(item.fullyQualifiedName)">
                        <v-btn slot="activator" @click.stop="updateContacts(item, 'addition')" outline fab small color="teal accent-4">
                          <v-icon  color="teal accent-4">person_add</v-icon>
                        </v-btn>
                        <span>Add to Contacts</span>
                      </v-tooltip>

                      <v-tooltip bottom v-else>
                        <v-btn slot="activator" @click.stop="updateContacts(item, 'deletion')" outline fab small color="teal accent-4">
                          <v-icon  color="teal accent-4">delete</v-icon>
                        </v-btn>
                        <span>Remove from Contacts</span>
                      </v-tooltip>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
        <div class="mt-5 text-xs-center" v-else-if="searchResult.length === 0 && !isResolved">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import contactService from '@/services/contacts'

export default {
  name: 'search-results',
  computed: {
    ...mapGetters({
      isSearching: 'isSearching',
      isResolved: 'isResolved',
      searchResult: 'getSearchResult',
      contacts: 'getContacts'
    }),
    // computed property for showing addition/deletion button on contacts
    addedContacts () {
      // creating an object with fullyQualifiedName as key/value to check,
      // wheteher a contact is already is in the contact list or not with O(1) as time complexity(just like to brag)
      const addedContacts = {}
      if (this.contacts.length > 0) {
        this.contacts.forEach((item) => {
          this.$set(addedContacts, item.fullyQualifiedName, item.fullyQualifiedName)
        })
      }
      return addedContacts
    }
  },
  mixins: [contactService],
  methods: {
    showContactProfile (contact) {
      // setting user data for quick view of profile (now user does'nt have to wait for API response for searching user profile)
      this.$store.commit('MUTATION_SET_USER', contact)
      this.$store.commit('MUTATION_SET_REDIRECTION_STATE', true)
      this.$store.commit('MUTATION_SET_SEARCH_STATE', false)
      this.$store.commit('MUTATION_SET_SEARCH_RESULT', [])
      // taking user to profile page with user id as params
      this.$router.push({ name: 'Profile', params: { id: contact.fullyQualifiedName } })
    }
  },
  mounted () {
    // method from contactService mixin
    // updateContacts in HTML above is also from same mixin
    this.getContacts()
  }
}
</script>
