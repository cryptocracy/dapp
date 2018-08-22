<template lang="html">
  <div class="re-page-banner" :style="style">
    <div class="overlay"></div>
    <h1>Page with banner</h1>
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

<style lang="css">
</style>
