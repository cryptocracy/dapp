import Home from '@/components/home/HomeIndex'

import Profile from '@/components/Profile'
import favContacts from '@/components/contacts/FavouriteContacts'

// import TagForm from '@/components/tags/TagForm'
// import MyTagList from '@/components/tags/MyTagList'
// import FavoriteTagList from '@/components/tags/FavoriteTagList'
// import TagInfo from '@/components/tags/TagInfo'

import ObjectInfo from '@/components/object/ObjectInfo'
import MyObjectList from '@/components/object/MyObjectList'
import FavoriteObjectList from '@/components/object/FavoriteObjectList'

import ImageForm from '@/components/images/ImageForm'
// import MyImageList from '@/components/images/MyImageList'
// import FavoriteImageList from '@/components/images/FavoriteImageList'
// import ImageInfo from '@/components/images/ImageInfo'

import EventForm from '@/components/events/EventForm'
// import MyEventList from '@/components/events/MyEventList'
// import FavoriteEventList from '@/components/events/FavoriteEventList'
// import EventInfo from '@/components/events/EventInfo'

import MarkerForm from '@/components/markers/MarkerForm'
// import MyMarkerList from '@/components/markers/MyMarkerList'
// import FavoriteMarkerList from '@/components/markers/FavoriteMarkerList'
// import MarkerInfo from '@/components/markers/MarkerInfo'

import TaskForm from '@/components/tasks/TaskForm'
// import MyTaskList from '@/components/tasks/MyTaskList'
// import FavoriteTaskList from '@/components/tasks/FavoriteTaskList'
// import TaskInfo from '@/components/tasks/TaskInfo'

import WalletSummary from '@/components/wallet/Summary'
import WalletReceive from '@/components/wallet/Receive'
import WalletHistory from '@/components/wallet/History'
import WalletSend from '@/components/wallet/Send'
import Settings from '@/components/settings/Settings'
import Quorum from '@/components/quorum/Quorum'

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
  { path: '/settings', name: 'Settings', component: Settings },

  // { path: '/tags/add-tag', name: 'AddTag', props: true, component: TagForm },
  // { path: '/tags/edit-tag', name: 'EditTag', props: true, component: TagForm },
  // { path: '/tags/owned', name: 'Owned', component: MyTagList },
  // { path: '/tags/favorites', name: 'Favorites', component: FavoriteTagList },
  // { path: '/tags/:tagName', name: 'TagInfo', props: true, component: TagInfo },

  { path: '/images/add-image', name: 'AddImage', props: true, component: ImageForm },
  { path: '/images/edit-image', name: 'EditImage', props: true, component: ImageForm },
  { path: '/images/owned', name: 'OwnedImages', component: MyObjectList, props: { type: 'image' } },
  // { path: '/images/favorites', name: 'FavoritesImages', component: FavoriteImageList },
  { path: '/images/favorites', name: 'FavoriteImages', component: FavoriteObjectList, props: { type: 'image' } },
  { path: '/images/info', name: 'ImageInfo', props: true, component: ObjectInfo },

  { path: '/events/add-event', name: 'AddEvent', props: true, component: EventForm },
  { path: '/events/edit-event', name: 'EditEvent', props: true, component: EventForm },
  { path: '/events/owned', name: 'OwnedEvents', component: MyObjectList, props: { type: 'event' } },
  { path: '/events/favorites', name: 'FavoriteEvents', component: FavoriteObjectList, props: { type: 'event' } },
  { path: '/events/info', name: 'EventInfo', props: true, component: ObjectInfo },

  { path: '/markers/add-marker', name: 'AddMarker', props: true, component: MarkerForm },
  { path: '/markers/edit-marker', name: 'EditMarker', props: true, component: MarkerForm },
  { path: '/markers/owned', name: 'OwnedMarkers', component: MyObjectList, props: { type: 'marker' } },
  // { path: '/markers/favorites', name: 'FavoritesMarkers', component: FavoriteMarkerList },
  { path: '/markers/favorites', name: 'FavoriteMarkers', component: FavoriteObjectList, props: { type: 'marker' } },
  { path: '/markers/info', name: 'MarkerInfo', props: true, component: ObjectInfo },

  { path: '/tasks/add-task', name: 'AddTask', props: true, component: TaskForm },
  { path: '/tasks/edit-task', name: 'EditTask', props: true, component: TaskForm },
  { path: '/tasks/owned', name: 'OwnedTasks', component: MyObjectList, props: { type: 'task' } },
  // { path: '/tasks/favorites', name: 'FavoritesTasks', component: FavoriteTaskList },
  { path: '/tasks/favorites', name: 'FavoritesTasks', component: FavoriteObjectList, props: { type: 'task' } },
  { path: '/tasks/info', name: 'TaskInfo', props: true, component: ObjectInfo },

  { path: '/wallet/summary', name: 'Summary', component: WalletSummary },
  { path: '/wallet/receive', name: 'Receive', component: WalletReceive },
  { path: '/wallet/history', name: 'History', component: WalletHistory },
  { path: '/wallet/send', name: 'Send', component: WalletSend },

  { path: '/quorum', name: 'Quorum', component: Quorum }
]

export default routes
