<template lang="html">
  <div class="iconbox-wrapper">
    <div class="row">
      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#1ebea5"
          icon="place"
          class='step2'
          data-step="2"
          data-intro="This is step 2"
          data-position="bottom"
          :title="markerCount"
          subtitle="Markers Owned"
          to="/markers/owned"
        >
        </app-icon-box>
      </div>

      <!-- <div class="col-md-3">
        <app-icon-box
          backgroundColor="#1ebea5"
          icon="label"
          :title="tagCount"
          subtitle="Tags Owned"
          to="/tags/owned"
        >
        </app-icon-box>
      </div> -->

      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#2CDBA5"
          icon="image"
          data-step="3"
          data-intro="This is step 3"
          data-position="bottom"
          :title="imageCount"
          class='step3'
          subtitle="Images Owned"
          to="/images/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#2CDBA5"
          icon="today"
          class='step4'
          data-step="4"
          data-intro="This is step 4"
          data-position="bottom"
          :title="eventCount"
          subtitle="Events Owned"
          to="/events/owned"
        >
        </app-icon-box>
      </div>
      
      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#31e6a5"
          icon="list"
          data-step="5"
          data-intro="This is step 5"
          data-position="bottom"
          :title="taskCount"
          class='step5'
          subtitle="Images Owned"
          to="/tasks/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#31e6a5"
          icon="work"
          data-step="6"
          data-intro="This is step 6"
          data-position="bottom"
          :title="projectCount"
          class='step6'
          subtitle="Projects Owned"
          to="/projects/owned"
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
    imageCount: 0,
    markerCount: 0,
    eventCount: 0,
    taskCount: 0,
    projectCount: 0
  }),
  mounted () {
    storageService.getFile({ fileName: 'my_events.json', options: { decrypt: false } }).then((res) => { this.eventCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_tags.json', options: { decrypt: false } }).then((res) => { this.tagCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_markers.json', options: { decrypt: false } }).then((res) => { this.markerCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_images.json', options: { decrypt: false } }).then((res) => { this.imageCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_tasks.json', options: { decrypt: false } }).then((res) => { this.taskCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_projects.json', options: { decrypt: false } }).then((res) => { this.projectCount = res ? Object.keys(res).length : 0 })
  }
}
</script>

<style lang="css">
</style>
