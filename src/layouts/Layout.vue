<template lang="html">
  <div class="readmin-panel">
    <div class="panel-heading">
      <h5>{{title}}</h5>
    </div>
    <div class="panel-body" :is="children" :style="{height: height}">
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'children', 'height'],
};
</script>

<style lang="css">
</style>
