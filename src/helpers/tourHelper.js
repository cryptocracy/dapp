import Shepherd from 'shepherd.js'
export const tourMixin = {
  methods: {
    showHelp () {
      let shepTour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          scrollTo: false
        }
      })
      shepTour.addStep('crowdfunding', {
        text: 'You use this button to create crowdfunding content, such as Markers, Images, Events, or Tasks. Note: Projects are coming soon.',
        attachTo: '.floatShepherd bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Skip',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('summaryTitle', {
        text: 'These are your summary tiles, showing you exactly how many owned content objects you have, simply click to view their lists.',
        attachTo: '.summaryTitle bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Skip',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('walletInput', {
        text: 'This is your Input Graph of your Bitcoin Wallet, showing you how and when you have received Bitcoin.',
        attachTo: '.walletInput bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Skip',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('walletOutput', {
        text: 'This is your Output Graph of your Bitcoin Wallet, showing you how and when you have sent Bitcoin.',
        attachTo: '.walletOutput bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Skip',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('DashboardMap', {
        text: 'This is your Dashboard Map where you can click to search for content in that area clicked.',
        attachTo: '.dashboardMap bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Skip',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('mainMenu', {
        text: 'This is how you access Main Menu, where you can click to explorer the various components of Cryptocracy.',
        attachTo: '.mainMenu bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Skip',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.addStep('searchShepherd', {
        text: 'This is how you change the type of search you are performing, to search for Contacts by name, or to search for content by Tag',
        attachTo: '.searchShepherd bottom',
        classes: 'stepFont',
        buttons: [
          {
            text: 'Done',
            classes: 'tourButton',
            action: shepTour.cancel
          },
          {
            text: 'Back',
            classes: 'tourButton',
            action: shepTour.back
          },
          {
            text: 'Next',
            classes: 'tourButton',
            action: shepTour.next
          }
        ]
      })
      shepTour.start()
    }
  }
}
