<template>
  <div>
    <div>
      <div class="re-page-banner" :style="style">
        <div class="overlay"></div>
        <h1>Our Pricing</h1>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-6">
          <div class="an-pricing-table-single with-shadow-dark wow fadeIn" data-wow-delay=".1s">
            <div class="price-header">
              <h3 class="plan-name">Basic</h3>
              <h1 class="plan-price"><span>$</span>17.69</h1>
              <p>Per Month</p>
            </div>
            <div class="helper-text">
              <p>It is a long established fact that a reader will be dist racted by the readable.</p>
            </div>
            <ul class="feature-lists">
              <li>10 Members</li>
              <li>2GB Downloads</li>
              <li>Unlimited browsing</li>
            </ul>
            <div class="price-footer">
              <v-btn color="primary">Choose plan</v-btn>
            </div>
          </div>

        </div>

        <div class="col-md-4 col-sm-6">
          <div class="an-pricing-table-single with-shadow-dark wow fadeIn" data-wow-delay=".1s">
            <div class="price-header">
              <h3 class="plan-name">Standard</h3>
              <h1 class="plan-price"><span>$</span>20.69</h1>
              <p>Per Month</p>
            </div>
            <div class="helper-text">
              <p>It is a long established fact that a reader will be dist racted by the readable.</p>
            </div>
            <ul class="feature-lists">
              <li>10 Members</li>
              <li>2GB Downloads</li>
              <li>Unlimited browsing</li>
            </ul>
            <div class="price-footer">
              <v-btn color="primary">Choose plan</v-btn>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-sm-6">
          <div class="an-pricing-table-single with-shadow-dark wow fadeIn" data-wow-delay=".1s">
            <div class="price-header">
              <h3 class="plan-name">Platinum</h3>
              <h1 class="plan-price"><span>$</span>300</h1>
              <p>Per Month</p>
            </div>
            <div class="helper-text">
              <p>It is a long established fact that a reader will be dist racted by the readable.</p>
            </div>
            <ul class="feature-lists">
              <li>10 Members</li>
              <li>2GB Downloads</li>
              <li>Unlimited browsing</li>
            </ul>
            <div class="price-footer">
              <v-btn color="primary">Choose plan</v-btn>
            </div>
          </div>
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
  };
</script>

<style scoped>

</style>
