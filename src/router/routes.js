import Home from '@/components/home/HomeIndex'

import Profile from '@/components/Profile'
import favContacts from '@/components/contacts/FavouriteContacts'

import TagForm from '@/components/tags/TagForm'
import MyTagList from '@/components/tags/MyTagList'
import FavoriteTagList from '@/components/tags/FavoriteTagList'
import TagInfo from '@/components/tags/TagInfo'

import WalletSummary from '@/components/wallet/Summary'
import WalletReceive from '@/components/wallet/Receive'
import WalletHistory from '@/components/wallet/History'
import WalletSend from '@/components/wallet/Send'

/**
* Routes Data
*
* @type {Array of Objects}
* @param {string} path Routes path
* @param {string} name Router name to use redirect or push routes
* @param {function} component Router component for path
*
*/

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile/:id', name: 'Profile', component: Profile },
  { path: '/favourite-contacts', name: 'favourite-contacts', component: favContacts },

  { path: '/tags/add-tag', name: 'AddTag', props: true, component: TagForm },
  { path: '/tags/edit-tag', name: 'EditTag', props: true, component: TagForm },
  { path: '/tags/owned', name: 'Owned', component: MyTagList },
  { path: '/tags/favorites', name: 'Favorites', component: FavoriteTagList },
  { path: '/tags/:tagName', name: 'TagInfo', props: true, component: TagInfo },

  { path: '/wallet/summary', name: 'Summary', component: WalletSummary },
  { path: '/wallet/receive', name: 'Receive', component: WalletReceive },
  { path: '/wallet/history', name: 'History', component: WalletHistory },
  { path: '/wallet/send', name: 'Send', component: WalletSend }
]

export default routes
