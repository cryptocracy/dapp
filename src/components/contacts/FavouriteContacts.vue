<template>
  <div class="container">
    <div>
      <v-layout v-if="contacts.length > 0" row>
        <v-flex xs12 sm8 offset-sm2>
          <v-card>
            <v-toolbar color="teal accent-4" dark>
              <v-toolbar-side-icon><v-icon>contacts</v-icon></v-toolbar-side-icon>

              <v-toolbar-title>My Contacts</v-toolbar-title>

              <v-spacer></v-spacer>

              <!-- <v-btn icon>
                <v-icon>person</v-icon>
              </v-btn> -->
            </v-toolbar>
            <!-- <v-subheader>My Contacts</v-subheader> -->
            <v-list two-line>
              <template v-for="(item, index) in contacts">
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

                    <v-tooltip bottom>
                      <v-btn slot="activator" @click.stop="updateContacts(item, 'deletion')" outline fab small color="teal accent-4">
                        <v-icon  large color="teal accent-4">delete</v-icon>
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
      <div v-else class="mt-5 text-xs-center">
        <h1>No contacts found</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import contactService from '@/services/contacts'

export default {
  name: 'favourite-contacts',
  computed: {
    ...mapGetters({
      contacts: 'getContacts'
    })
  },
  mixins: [contactService],
  methods: {
    showContactProfile (contact) {
      this.$store.commit('MUTATION_SET_USER', contact)
      this.$store.commit('MUTATION_SET_REDIRECTION_STATE', true)
      this.$store.commit('MUTATION_SET_SEARCH_STATE', false)
      this.$store.commit('MUTATION_SET_SEARCH_RESULT', [])
      this.$router.push({ name: 'Profile', params: { id: contact.fullyQualifiedName } })
    }
  },
  mounted () {
    // method from contactService mixin
    this.getContacts()
  }
}
</script>
