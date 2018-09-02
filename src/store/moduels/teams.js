import user1 from '../../assets/img/user1.jpg'
import user2 from '../../assets/img/user2.jpg'
import user3 from '../../assets/img/user3.jpg'

/**
 * Teams Data
 *
 * @type {Array of Objects}
 * @param {number} id of each object
 * @param {string} name of the team member
 * @param {number} role of the company
 * @param {img} string user avatar
 */

export default {
  data: [
    {
      id: 1,
      name: 'Ty',
      role: 'Co-Founder',
      img: user1
    },
    {
      id: 2,
      name: 'Casper',
      role: 'Co-Founder',
      img: user2
    },
    {
      id: 3,
      name: 'Akash',
      role: 'Co-Founder',
      img: user3
    }
  ]
}
