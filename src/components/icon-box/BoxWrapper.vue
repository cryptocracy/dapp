<template lang="html">
  <div class="iconbox-wrapper">
    <div class="row">
      <div class="col-md-4">
        <app-icon-box
          backgroundColor="#1ebea5"
          icon="favorite_border"
          :title="projectCount"
          subtitle="Projects Owned"
          to="/"
        >
        </app-icon-box>
      </div>

      <div class="col-md-4">
        <app-icon-box
          backgroundColor="#29d4a5"
          icon="list"
          :title="taskCount"
          subtitle="Tasks Owned"
          to="/"
        >
        </app-icon-box>
      </div>

      <div class="col-md-4">
        <app-icon-box
          backgroundColor="#31e6a5"
          icon="language"
          :title="tagCount"
          subtitle="Tags Owned"
          to="/tags/owned"
        >
        </app-icon-box>
      </div>
    </div>
  </div>

</template>

<script>
import BoxSingle from './BoxSingle'
import storageService from '../../services/blockstack-storage'
export default {
  components: {
    'app-icon-box': BoxSingle,
    storageService
  },
  data: () => ({
    tagCount: 0,
    taskCount: 0,
    projectCount: 0
  }),
  mounted () {
    storageService.getFile({ fileName: 'my_tags.json' }).then((res) => { this.tagCount = res ? Object.keys(res).length : 0 })
  }
}
</script>

<style lang="css">
</style>
