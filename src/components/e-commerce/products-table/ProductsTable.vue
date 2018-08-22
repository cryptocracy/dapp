<template>
    <div class="table-responsive">
      <table class="table table-consended product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Visits</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsTableData" :key="product.id">
            <td><img class="product-table-img" :src="product.imageUrl" alt=""/></td>
            <td>{{product.name}}</td>
            <td>{{product.visit}}</td>
            <td>{{product.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  export default {
    computed: {
      /**
      * Get most viewed products data from vuex store
      * as a props to the componenet
      */
      productsTableData() {
        return this.$store.state.productsTable.data;
      },
    },
  };
</script>

<style scoped>
.product-table-img {
  margin: 10px 0;
}
</style>
