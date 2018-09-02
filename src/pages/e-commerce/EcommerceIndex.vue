<template lang="html">
  <div class="">
    <app-box-alter></app-box-alter>
    <v-layout row flex-wrap>
      <v-flex md7>
        <app-layout
          title="Most Viewed Products"
          :children="productsTable"
        ></app-layout>
      </v-flex>
      <v-flex md5>
        <app-layout
          title="Total Downloads"
          :children="totalDownloads"
        ></app-layout>
        <app-box
          backgroundColor="#fdba2c"
          icon="shopping_basket"
          title="1, 250"
          subtitle="Orders"
        ></app-box>
      </v-flex>
      <v-flex md12>
        <app-layout
          title="Active Support Agents"
          :children="UserTable"
        ></app-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BoxAlterWrapper from '@/components/icon-box-alter/BoxAlterWrapper'
import productsTable from '@/components/e-commerce/products-table/ProductsTable'
import totalDownloads from '@/components/total-downloads/TotalDownloads'
import BoxSingle from '@/components/icon-box/BoxSingle'
import UserTable from '@/components/tables/data-tables/UserTable'

export default {
  components: {
    'app-box-alter': BoxAlterWrapper,
    'app-box': BoxSingle
  },

  data: () => ({
    productsTable,
    totalDownloads,
    UserTable
  })
}
</script>

<style lang="css">
</style>
