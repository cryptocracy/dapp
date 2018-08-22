<template>
  <div>
    <div>
      <div class="re-page-banner" :style="style">
        <div class="overlay"></div>
        <h1>Blog</h1>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="blog in blogs" :key="blog.id">
          <a href="">
            <div class="blog-single">
              <img :src="blog.img" alt="" />
              <div class="details">
                <h5>{{blog.title}}</h5>
                <p>{{blog.category}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import imageUrl from '../../../assets/img/banner.jpg';

  export default {
    data: () => ({
      style: {
        backgroundImage: `url( ${imageUrl} )`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      },
    }),

    computed: {
      /**
       * Get all blog data from store
      */
      blogs() {
        return this.$store.state.blog.data;
      },

    },

  };
</script>

<style scoped>

</style>
