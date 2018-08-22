<template lang="html">
  <div class="iconbox-single" :style="{background: backgroundColor}">
    <div class="box-title">
      <div class="circle-icon" >
        <v-icon>{{ icon }}</v-icon>
      </div>
      <div>
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['backgroundColor', 'title', 'subtitle', 'icon'],
};
</script>

<style lang="css">
</style>
