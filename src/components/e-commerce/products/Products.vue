<template>
  <div class="readmin-products">
    <div class="row">
      <div class="col-md-4 col-sm-6" v-for="product in products" :key="product.id">
        <a href="#">
          <div class="product-single">
            <v-icon class="favorite">favorite_border</v-icon>
            <img :src="product.imgUrl" alt=" "/>
            <h5>{{product.name}}</h5>
            <p class="price">${{product.price}}</p>
            <v-btn outline color="indigo">Add To Cart</v-btn>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    /**
      * Get most viewed products data from vuex store
      * as a props to the componenet
      */
    products () {
      return this.$store.state.products.data
    }
  }

}
</script>

<style scoped>

</style>
