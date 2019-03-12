<template lang="html">
  <div class="iconbox-wrapper">
    <div>
      <!-- <button @click='shepherdTour()'>Shepherd Tour</button> -->
      <v-btn
        @click='shepherdTour()'
      >
        Shepherd Tour
      </v-btn>
    </div>
    <div class="row step2">
      <!-- <div class="col-md-3">
        <app-icon-box
          backgroundColor="#1ebea5"
          icon="place"
          data-step="2"
          data-intro="This is step 2"
          data-position="bottom"
          :title="markerCount"
          subtitle="Markers Owned"
          to="/markers/owned"
        >
        </app-icon-box>
      </div> -->

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
          class= 'imageShepherd'
          backgroundColor="#1ebea5"
          icon="image"
          :title="imageCount"
          subtitle="Images Owned"
          to="/images/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          class= 'eventShepherd'
          backgroundColor="#2CDBA5"
          icon="today"
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
          class='taskShepherd'
          backgroundColor="#31e6a5"
          icon="list"
          data-step="5"
          data-intro="This is step 5"
          data-position="bottom"
          :title="taskCount"
          subtitle="Tasks Owned"
          to="/tasks/owned"
        >
        </app-icon-box>
      </div>

      <div class="col-md-3">
        <app-icon-box
          class='projectShepherd'
          backgroundColor="#31e6a5"
          icon="work"
          data-step="6"
          data-intro="This is step 6"
          data-position="bottom"
          :title="projectCount"
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
import Shepherd from 'shepherd.js'

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
  methods: {
    shepherdTour () {
      let shepTour = new Shepherd.Tour({
        useModalOverlay: true
        // defaultStepOptions: {
        //   // classes: 'shadow-md bg-purple-dark',
        //   scrollTo: true
        // }
      })
      shepTour.addStep('example-step', {
        text: 'This is Shepherd js IMAGE tour experiment.',
        attachTo: '.imageShepherd bottom',
        title: 'IMAGES',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('example-step1', {
        text: 'This is Shepherd js EVENT tour experiment.',
        attachTo: '.eventShepherd bottom',
        title: 'EVENTS',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('example-step2', {
        text: 'This is Shepherd js TASK tour experiment.',
        attachTo: '.taskShepherd bottom',
        title: 'TASK',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('example-step3', {
        text: 'This is Shepherd js Project tour experiment.',
        attachTo: '.projectShepherd bottom',
        title: 'PROJECT',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('example-step4', {
        text: 'This is Shepherd js float tour experiment.',
        attachTo: '.floatShepherd bottom',
        title: 'FLOAT TOUR',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('example-step5', {
        text: 'This is Shepherd js contact tour experiment. This is Shepherd js contact tour experiment. This is Shepherd js contact tour experiment.',
        attachTo: '.searchShepherd bottom',
        title: 'SEARCH',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('example-step6', {
        text: 'This is Shepherd js float tour experiment.',
        attachTo: '.contactShepherd bottom',
        title: 'CONTACT',
        showCancelLink: 'X',
        buttons: [
          {
            text: 'DONE',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            action: shepTour.back
          },
          {
            text: 'Next',
            action: shepTour.next
          }
        ]
      })
      shepTour.start()
    }
  },
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
