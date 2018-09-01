<template lang="html">
  <div>
    <v-layout row flex-wrap>
      <v-flex md12>
        <app-layout
          title="Basic Tab"
          :children="BasicTab"
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Tab with Icon"
          :children="TabIconText"
          >
        </app-layout>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Tab With Pagination"
          :children="TabWithPagination"
          >
        </app-layout>
      </v-flex>

      <v-flex md12>
        <app-layout
          title="Tab With Search"
          :children="TabWithSearch"
          >
        </app-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BasicTab from '@/components/ui-elements/tabs/BasicTab'
import TabIconText from '@/components/ui-elements/tabs/TabIconText'
import TabWithPagination from '@/components/ui-elements/tabs/TabWithPagination'
import TabWithSearch from '@/components/ui-elements/tabs/TabWithSearch'

export default {
  data: () => ({
    BasicTab,
    TabIconText,
    TabWithPagination,
    TabWithSearch
  })
}
</script>

<style lang="css">
</style>
