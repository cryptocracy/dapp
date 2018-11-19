import Home from '@/pages/home/HomeIndex'

import Ecommerce from '@/pages/e-commerce/EcommerceIndex'
import Products from '@/pages/e-commerce/Products'
import OrderReview from '@/pages/e-commerce/OrderReview'

import Buttons from '@/pages/ui-elements/buttons/ButtonsIndex'
import AppBars from '@/pages/ui-elements/app-bars/AppBarsIndex'
import UiComponents from '@/pages/ui-elements/ui-components/ComponentsIndex'
import Cards from '@/pages/ui-elements/cards/CardsIndex'
import Sliders from '@/pages/ui-elements/sliders/SlidersIndex'
import DatePickers from '@/pages/ui-elements/date-pickers/DatePickersIndex'
import TimePickers from '@/pages/ui-elements/time-pickers/TimePickersIndex'
import Dialogs from '@/pages/ui-elements/dialogs/DialogsIndex'
import Tabs from '@/pages/ui-elements/tabs/TabsIndex'
import Progress from '@/pages/ui-elements/progress/ProgressIndex'
import Lists from '@/pages/ui-elements/lists/ListsIndex'
import Menus from '@/pages/ui-elements/menus/MenusIndex'
import Icons from '@/pages/ui-elements/icons/IconsIndex'
import GridLists from '@/pages/ui-elements/grid-lists/GridListsIndex'
import Grids from '@/pages/ui-elements/grids/GridsIndex'
import Alerts from '@/pages/ui-elements/alerts/AlertIndex'
import Chips from '@/pages/ui-elements/chips/ChipsIndex'

import BasicForms from '@/pages/forms/basic-forms/BasicFormsIndex'
import Switches from '@/pages/forms/switches/SwitchesIndex'
import FormLayouts from '@/pages/forms/form-layouts/FormLayoutsIndex'

import Charts from '@/pages/charts/ChartsIndex'
/* import LineCharts from '@/pages/charts/line-charts/LineChartsIndex';
 * import BarCharts from '@/pages/charts/bar-charts/BarChartsIndex';
 * import AreaCharts from '@/pages/charts/area-charts/AreaChartsIndex';
 * import PieCharts from '@/pages/charts/pie-charts/PieChartsIndex';
 * import OtherCharts from '@/pages/charts/other-charts/OtherChartsIndex'; */

import BootstrapTables from '@/pages/tables/bootstrap/BootstrapTablesIndex'
import UserTables from '@/pages/tables/user/UserTablesIndex'

import Maps from '@/pages/maps/MapsIndex'

import About from '@/pages/pages/about/AboutIndex'
import Services from '@/pages/pages/services/ServicesIndex'
import Contact from '@/pages/pages/contact/ContactIndex'
import Blog from '@/pages/pages/blog/BlogIndex'
import Pricing from '@/pages/pages/pricing-table/PricingIndex'
import Faq from '@/pages/pages/faq/FaqIndex'

import Login from '@/pages/other-pages/login/LoginIndex'
import Register from '@/pages/other-pages/register/RegisterIndex'
import ForgotPassword from '@/pages/other-pages/forgot-password/ForgotPasswordIndex'
import MailConfirm from '@/pages/other-pages/mail-confirm/MailConfirmIndex'
import PageError from '@/pages/other-pages/page-404/Page404Index'

import DefaultLayout from '@/pages/page-layouts/default/DefaultIndex'
import BannerLayout from '@/pages/page-layouts/banner/BannerIndex'
import Profile from '@/components/Profile'
import favContacts from '@/components/contacts/FavouriteContacts'

import TagForm from '@/pages/page-layouts/tags/TagForm'
import MyTagList from '@/pages/page-layouts/tags/MyTagList'
import FavoriteTagList from '@/pages/page-layouts/tags/FavoriteTagList'
import TagInfo from '@/pages/page-layouts/tags/TagInfo'

import ImageForm from '@/pages/page-layouts/images/ImageForm'
import MyImageList from '@/pages/page-layouts/images/MyImageList'
import FavoriteImageList from '@/pages/page-layouts/images/FavoriteImageList'
import ImageInfo from '@/pages/page-layouts/images/ImageInfo'

import MarkerForm from '@/pages/page-layouts/markers/MarkerForm'
import MyMarkerList from '@/pages/page-layouts/markers/MyMarkerList'
import FavoriteMarkerList from '@/pages/page-layouts/markers/FavoriteMarkerList'
import MarkerInfo from '@/pages/page-layouts/markers/MarkerInfo'

import WalletSummary from '@/pages/page-layouts/wallet/Summary'
import WalletReceive from '@/pages/page-layouts/wallet/Receive'
import WalletHistory from '@/pages/page-layouts/wallet/History'
import WalletSend from '@/pages/page-layouts/wallet/Send'

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
  /** { path: '/settings', name: 'Settings', component: Settings }, */
  { path: '/ecommerce', name: 'Ecommerce', component: Ecommerce },

  { path: '/ui/grids', name: 'Grids', component: Grids },
  { path: '/ecommerce/products', name: 'Products', component: Products },
  { path: '/ecommerce/order-review', name: 'OrderReview', component: OrderReview },
  { path: '/ui/buttons', name: 'Buttons', component: Buttons },
  { path: '/ui/app-bars', name: 'AppBars', component: AppBars },
  { path: '/ui/ui-components', name: 'UiComponents', component: UiComponents },
  { path: '/ui/cards', name: 'Cards', component: Cards },
  { path: '/ui/chips', name: 'Chips', component: Chips },
  { path: '/ui/sliders', name: 'Sliders', component: Sliders },
  { path: '/ui/date-pickers', name: 'DatePickers', component: DatePickers },
  { path: '/ui/time-pickers', name: 'TimePickers', component: TimePickers },
  { path: '/ui/dialogs', name: 'Dialogs', component: Dialogs },
  { path: '/ui/tabs', name: 'Tabs', component: Tabs },
  { path: '/ui/progress', name: 'Progress', component: Progress },
  { path: '/ui/lists', name: 'Lists', component: Lists },
  { path: '/ui/menus', name: 'Menus', component: Menus },
  { path: '/ui/icons', name: 'Icons', component: Icons },
  { path: '/ui/grid-lists', name: 'GridLists', component: GridLists },
  { path: '/ui/alerts', name: 'Alerts', component: Alerts },

  { path: '/forms/basic-forms', name: 'BasicForms', component: BasicForms },
  { path: '/forms/switches', name: 'Switches', component: Switches },
  { path: '/forms/form-layouts', name: 'FormLayouts', component: FormLayouts },

  { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/charts/line-charts', name: 'LineCharts', component: LineCharts },
  // { path: '/charts/bar-charts', name: 'BarCharts', component: BarCharts },
  // { path: '/charts/area-charts', name: 'AreaCharts', component: AreaCharts },
  // { path: '/charts/pie-charts', name: 'PieCharts', component: PieCharts },
  // { path: '/charts/other-charts', name: 'OtherCharts', component: OtherCharts },

  { path: '/tables/bootstrap', name: 'BootstrapTables', component: BootstrapTables },
  { path: '/tables/user', name: 'UserTables', component: UserTables },

  { path: '/pages/about', name: 'About', component: About },
  { path: '/pages/services', name: 'Services', component: Services },
  { path: '/pages/contact', name: 'Contact', component: Contact },
  { path: '/pages/blog', name: 'Blog', component: Blog },
  { path: '/pages/pricing', name: 'Pricing', component: Pricing },
  { path: '/pages/faq', name: 'Faq', component: Faq },

  { path: '/other-pages/login', name: 'Login', component: Login },
  { path: '/other-pages/register', name: 'Register', component: Register },
  { path: '/other-pages/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/other-pages/mail-confirm', name: 'MailConfirm', component: MailConfirm },
  { path: '/other-pages/page-404', name: 'PageError', component: PageError },
  { path: '/page-layout/default', name: 'DefaultLayout', component: DefaultLayout },
  { path: '/page-layout/banner', name: 'BannerLayout', component: BannerLayout },
  { path: '/maps', name: 'Maps', component: Maps },

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
