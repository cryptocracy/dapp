import iphone6 from '../../assets/img/iphone-1.png'
import iphone7 from '../../assets/img/iphone7.png'
import iphoneSe from '../../assets/img/iphone-se.jpg'

/**
* Most Viewed Products Data
*
* @type {Array of Objects}
* @param {number} id of each object
* @param {string} name name of the product
* @param {number} visit number of visit of a product
* @param {string} price of the product
*/

export default {
  data: [
    {
      id: 1,
      imageUrl: iphone6,
      name: 'iPhone 6 64GB unlocked black',
      visit: 2345,
      price: '$ 679'
    },
    {
      id: 2,
      imageUrl: iphone7,
      name: 'iPhone 7 128GB Matblack',
      visit: 4235,
      price: '$ 789'
    },
    {
      id: 3,
      imageUrl: iphoneSe,
      name: 'iPhone SE 32GB Gold',
      visit: 423,
      price: '$ 499'
    },
    {
      id: 4,
      imageUrl: iphone6,
      name: 'iPhone 6 64GB unlocked black',
      visit: 2345,
      price: '$ 679'
    },
    {
      id: 5,
      imageUrl: iphone7,
      name: 'iPhone 7 128GB Matblack',
      visit: 4235,
      price: '$ 789'
    }
  ]
}
