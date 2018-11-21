import Home from '@/components/home/HomeIndex'

import Profile from '@/components/Profile'
import favContacts from '@/components/contacts/FavouriteContacts'

import TagForm from '@/components/tags/TagForm'
import MyTagList from '@/components/tags/MyTagList'
import FavoriteTagList from '@/components/tags/FavoriteTagList'
import TagInfo from '@/components/tags/TagInfo'

import ImageForm from '@/pages/page-layouts/images/ImageForm'
import MyImageList from '@/pages/page-layouts/images/MyImageList'
import FavoriteImageList from '@/pages/page-layouts/images/FavoriteImageList'
import ImageInfo from '@/pages/page-layouts/images/ImageInfo'

import MarkerForm from '@/pages/page-layouts/markers/MarkerForm'
import MyMarkerList from '@/pages/page-layouts/markers/MyMarkerList'
import FavoriteMarkerList from '@/pages/page-layouts/markers/FavoriteMarkerList'
import MarkerInfo from '@/pages/page-layouts/markers/MarkerInfo'

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

  { path: '/images/add-image', name: 'AddImage', props: true, component: ImageForm },
  { path: '/images/edit-image', name: 'EditImage', props: true, component: ImageForm },
  { path: '/images/owned', name: 'OwnedImages', component: MyImageList },
  { path: '/images/favorites', name: 'FavoritesImages', component: FavoriteImageList },
  { path: '/images/:imageName', name: 'ImageInfo', props: true, component: ImageInfo },

  { path: '/markers/add-marker', name: 'AddMarker', props: true, component: MarkerForm },
  { path: '/markers/edit-marker', name: 'EditMarker', props: true, component: MarkerForm },
  { path: '/markers/owned', name: 'OwnedMarkers', component: MyMarkerList },
  { path: '/markers/favorites', name: 'FavoritesMarkers', component: FavoriteMarkerList },
  { path: '/markers/:markerName', name: 'MarkerInfo', props: true, component: MarkerInfo },

  { path: '/wallet/summary', name: 'Summary', component: WalletSummary },
  { path: '/wallet/receive', name: 'Receive', component: WalletReceive },
  { path: '/wallet/history', name: 'History', component: WalletHistory },
  { path: '/wallet/send', name: 'Send', component: WalletSend }
]

export default routes

// import TagForm from '@/pages/page-layouts/tags/TagForm'
// import MyTagList from '@/pages/page-layouts/tags/MyTagList'
// import FavoriteTagList from '@/pages/page-layouts/tags/FavoriteTagList'
// import TagInfo from '@/pages/page-layouts/tags/TagInfo'

// import ImageForm from '@/pages/page-layouts/images/ImageForm'
// import MyImageList from '@/pages/page-layouts/images/MyImageList'
// import FavoriteImageList from '@/pages/page-layouts/images/FavoriteImageList'
// import ImageInfo from '@/pages/page-layouts/images/ImageInfo'

// import MarkerForm from '@/pages/page-layouts/markers/MarkerForm'
// import MyMarkerList from '@/pages/page-layouts/markers/MyMarkerList'
// import FavoriteMarkerList from '@/pages/page-layouts/markers/FavoriteMarkerList'
// import MarkerInfo from '@/pages/page-layouts/markers/MarkerInfo'