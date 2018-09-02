<template>
  <div>
    <div>
      <div class="re-page-banner" :style="style">
        <div class="overlay"></div>
        <h1>Services</h1>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-6" v-for="service in services" :key="service.id">
          <div class="an-service-single">
            <i :class="service.icon"></i>
            <h4>{{service.name}}</h4>
            <p>{{service.text}}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import imageUrl from '../../../assets/img/banner.jpg'

export default {
  data: () => ({
    style: {
      backgroundImage: `url( ${imageUrl} )`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
  }),

  computed: {
    /**
       * Get the team members data from store
       */
    services () {
      return this.$store.state.services.data
    }
  }
}
</script>

<style scoped>

</style>
