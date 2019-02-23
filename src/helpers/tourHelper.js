import {start, tourMsg} from '@/helpers/tour'
// import introJs from 'intro.js'
export const tourMixin = {
  data: () => ({
    tourMsg
  }),
  methods: {
    showHelp () {
    //   if (this.showNavigation === false) {
    //     this.showNavigation = true
    //     setTimeout(() => {
    //       start(this.$route.name)
    //     }, 500)
    //   } else {
      start(this.$route.name) // isko uncomment kr deyo normal apne portal jaisa chalega..
    // console.log('start function call', this.$route.name)
    // iske niche sare introjs walo ki tarike se hai inko uncomment kr liyo.
    // let getIntroClass = document.getElementById('introClass').getAttribute('data-step')
    // let getIntrodata = document.getElementById('introDataStep').getAttribute('data-step')
    // let taggname = document.getElementsByTagName('nav')[0].className
    // console.log(taggname)
    // var intro = introJs()
    // intro.onchange(function (targetElement) {
    //   console.log('intro', targetElement)
    // if (getIntroClass === '1' || getIntrodata === '2') {
    //   console.log('jilo')
      // var closestContainer = $(targetElement).closest('div.modal').prop('id');
      // $('.introjs-overlay, .introjs-helperLayer, .introjs-tooltipReferenceLayer, .introjs-fixedTooltip').appendTo('#' + getIntroClass)
      // getIntroClass.classList.add('introjs-overlay', 'introjs-helperLayer', 'introjs-tooltipReferenceLayer', 'introjs-fixedTooltip')
      // getIntrodata.classList.add('introjs-overlay', 'introjs-helperLayer', 'introjs-tooltipReferenceLayer', 'introjs-fixedTooltip')
    // } else {
    //   console.log('jilo else')
      // getIntroClass.classList.add('.introjs-overlay, .introjs-helperLayer, .introjs-tooltipReferenceLayer, .introjs-fixedTooltip')
      // getIntrodata.classList.add('.introjs-overlay, .introjs-helperLayer, .introjs-tooltipReferenceLayer, .introjs-fixedTooltip')
      // $('.introjs-overlay, .introjs-helperLayer, .introjs-tooltipReferenceLayer, .introjs-fixedTooltip').appendTo('body')
    // }
    // })
    // introJs().start()
    //   }
    }
  }
}
