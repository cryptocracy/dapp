<template lang="html">
  <div class="iconbox-wrapper">
    <div class="row">
      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#1ebea5"
          icon="place"
          :title="markerCount"
          subtitle="Markers Owned"
          to="/markers/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#25CDA5"
          icon="label"
          :title="tagCount"
          subtitle="Tags Owned"
          to="/tags/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#2CDBA5"
          icon="image"
          :title="imageCount"
          subtitle="Images Owned"
          to="/images/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          backgroundColor="#31e6a5"
          icon="today"
          :title="eventCount"
          subtitle="Events Owned"
          to="/events/owned"
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
    eventCount: 0
  }),
  mounted () {
    storageService.getFile({ fileName: 'my_events.json', options: { decrypt: false } }).then((res) => { this.eventCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_tags.json', options: { decrypt: false } }).then((res) => { this.tagCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_markers.json', options: { decrypt: false } }).then((res) => { this.markerCount = res ? Object.keys(res).length : 0 })
    storageService.getFile({ fileName: 'my_images.json', options: { decrypt: false } }).then((res) => { this.imageCount = res ? Object.keys(res).length : 0 })
  }
}
</script>

<style lang="css">
</style>
