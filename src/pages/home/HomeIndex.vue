<template lang="html">
  <div class="container">
    <div v-if="isSearching">
      <v-layout v-if="searchResult.length > 0 && isResolved" row>
        <v-flex xs12 sm8 offset-sm2>
          <v-card>
            <!-- <v-toolbar color="cyan" dark>
              <v-toolbar-side-icon></v-toolbar-side-icon>

              <v-toolbar-title>Inbox</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar> -->
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
                  @click=""
                >
                  <v-list-tile-avatar>
                    <img v-if="item.profile.hasOwnProperty('image')" :src="item.profile.image[0].contentUrl">
                    <v-icon v-else large color="teal accent-4">person</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.fullyQualifiedName"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.profile.name"></v-list-tile-sub-title>
                  </v-list-tile-content>
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
    <div v-else>
      <app-box></app-box>

      <v-layout row flex-wrap>
        <v-flex md6>
          <app-layout
            height="300px"
            title="mBTC Input (Recent Donations)"
            :children="LineChart"
          >
          </app-layout>
        </v-flex>
        <v-flex md6>
          <app-layout
            height="300px"
            title="mBTC Output (Recent Payouts)"
            :children="BarChart"
          >
          </app-layout>
        </v-flex>

        <!-- <v-flex md12>
          <app-layout
            title="User Table"
            :children="UserTable"
          >
          </app-layout>
        </v-flex>-->
      </v-layout>
    </div>
    

  </div>
</template>

<script>
import BoxWrapper from '@/components/icon-box/BoxWrapper';
import LineChart from '@/components/charts/line-chart/LineChart';
import BarChart from '@/components/charts/bar-chart/BarChart';
import UserTable from '@/components/tables/data-tables/UserTable';
import { mapGetters } from 'vuex';

export default {
  components: {
    'app-box': BoxWrapper,
  },
  computed: {
    ...mapGetters({
      isSearching: 'isSearching',
      isResolved: 'isResolved',
      searchResult: 'getSearchResult',
    }),
  },
  data: () => ({
    LineChart,
    BarChart,
    UserTable,
  }),
};
</script>

<style lang="css">
</style>
