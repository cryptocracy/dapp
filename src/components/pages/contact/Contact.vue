<template>
  <div>
    <div>
      <div class="re-page-banner" :style="style">
        <div class="overlay"></div>
        <h1>Contact Us</h1>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h4 class="inner-box-title full">Address</h4>
          <div class="an-address-single">
            <p><i class="fa fa-phone"></i>+012345 6789</p>
            <p><i class="fa fa-envelope"></i>example@example.com</p>
            <p><i class="fa fa-map-marker"></i>West end 41str, San Francisco,<br/> 0123456 California, US</p>
          </div>
        </div>
        <div class="col-md-6 contact-form">
          <h4 class="inner-box-title full">Send Us Message</h4>
          <div>
            <v-text-field
              label="E-mail"
              required
              ></v-text-field>
          </div>
          <div>
            <v-text-field
              label="Message"
              required
              multi-line
              ></v-text-field>
          </div>
          <v-btn color="primary">Send Message</v-btn>
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
  })

}
</script>

<style scoped>

</style>
