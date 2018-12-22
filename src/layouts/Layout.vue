<template lang="html">
  <div class="readmin-panel br20">
    <div class="panel-heading">
      <h5>{{title}}</h5>
    </div>
    <div v-if="showGraph" class="panel-body" :is="children" :style="{height: height}">
    </div>
    <div v-else class="panel-body text-xs-center"  :style="{height: height}">
      <v-icon>fas fa-exchange-alt</v-icon>
      <h4 class="mt-5">
        No transactions found.
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['title', 'children', 'height'],
  computed: {
    ...mapGetters({
      showGraph: 'showGraph'
    })
  }
}
</script>

<style lang="css">
</style>
