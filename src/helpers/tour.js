import tourMsg from '@/helpers/tourMsg'
import introJs from 'intro.js'

let customTour = () => {
  let tipData = {}
  for (var routeKey in tourMsg) {
    tipData[routeKey] = []
    tourMsg[routeKey].forEach(data => {
      for (let key in data) {
        // let getIntroClass = document.getElementsByClassName('step6')
        // console.log('step6666666', getIntroClass)
        let tagName = document.getElementById('headerTour')
        if (key === 'step1') {
          tagName.classList.remove('introjs-fixParent')
          tagName.classList.add('headerClass')
          console.log('tag==>', tagName)
        }
        tipData[routeKey].push(
          {
            element: '.' + key,
            intro: data[key]
          }
        )
      }
    })
  }
  return tipData
}

const intro = introJs()

let start = (routeName) => {
  console.log('start', routeName)
  let tour = customTour()
  console.log('intro', intro)
  intro.setOptions({
    steps: tour[routeName],
    scrollToElement: true
  })
  intro.start()
}

export {start, tourMsg, intro}
