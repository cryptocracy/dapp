<template lang="html">
  <router-link class="iconbox-single" :style="{background: backgroundColor}" :to="to">
    <div class="box-title">
      <div class="circle-icon" >
        <v-icon>{{ icon }}</v-icon>
      </div>
      <div>
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['backgroundColor', 'title', 'subtitle', 'icon', 'to']
}
</script>

<style lang="css">
</style>
