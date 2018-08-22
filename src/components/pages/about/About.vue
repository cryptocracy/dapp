<template>
  <div>
    <div>
        <div class="re-page-banner" :style="style">
          <div class="overlay"></div>
          <h1>About Cryptocracy</h1>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="about-box-single">
              <h4 class="inner-box-title">WHY CHOOSE <span>CRYPTOCRACY</span>.</h4>
              <p>We believe enshrining the natural rights of the individual are at the core for building a better tomorrow for all.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="about-box-single">
              <h4 class="inner-box-title">OUR MISSION.</h4>
              <p>To empower the individual to form voluntary associations in order to peacefully achieve the completion of positive mutually beneficial Projects.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="about-box-single">
              <h4 class="inner-box-title">WHAT WE DO.</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quidem minus id omnis, nam expedita, ea fuga commodi voluptas iusto, hic autem deleniti.</p>
            </div>
          </div>
        </div>

        <h4 class="inner-box-title full">Meet the Founders</h4>

        <div class="row">
          <div class="col-md-4 col-sm-6" v-for="team in teams" :key="team.id">
          <div class="an-team-single light-bg">
            <div class="image-container">
              <img :src="team.img" alt="" />
              <div class="overlay">
                <ul class="small-social">
                  <li><a href=""><i class="fa fa-twitter"></i></a></li>
<!--                  <li><a href=""><i class="fa fa-facebook"></i></a></li>
                  <li><a href=""><i class="fa fa-pinterest"></i></a></li>
                  <li><a href=""><i class="fa fa-linkedin"></i></a></li>-->
                </ul>
              </div>
            </div>
            <div class="user-details">
              <h4><a href="">{{team.name}}</a></h4>
              <p>{{team.role}}</p>
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

    computed: {
      /**
       * Get the team members data from store
       */
      teams() {
        return this.$store.state.teams.data;
      },

    },
  };
</script>

<style scoped>

</style>
