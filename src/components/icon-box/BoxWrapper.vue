<template lang="html">
  <div class="iconbox-wrapper">
      <div class="row">
        <div class="col-md-4">
          <app-icon-box
            backgroundColor="#1ebea5"
            icon="favorite_border"
            title="2"
            subtitle="Projects Owned"
          >
          </app-icon-box>
        </div>

        <div class="col-md-4">
          <app-icon-box
            backgroundColor="#29d4a5"
            icon="list"
            title="2"
            subtitle="Tasks Owned"
          >
          </app-icon-box>
        </div>

        <div class="col-md-4">
          <app-icon-box
            backgroundColor="#31e6a5"
            icon="language"
            title="3"
            subtitle="Tags Owned"
          >
          </app-icon-box>
        </div>
      </div>
    </div>

</template>

<script>
import BoxSingle from './BoxSingle';

export default {
  components: {
    'app-icon-box': BoxSingle,
  },
};
</script>

<style lang="css">
</style>
