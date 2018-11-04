
/**
* Navigation menu data
*
* @type {Array of Objects}
* @param {string} color Left icon color for different menu
* @param {string} action Left icon of the list
* @param {string} title Title of the list
* @param {string} linkTo Router path
* @param {array} items.items Child list items
*
*/

const items = [
  {
    color: 'teal lighten-3',
    action: 'dashboard',
    title: 'Dashboard',
    linkTo: '/'
  },
  {
    color: 'blue lighten-2',
    action: 'label',
    title: 'Tags',
    items: [
      // { title: 'Add New', linkTo: { name: 'AddTag', params: { tagProp: null } } },
      // { title: 'Find', linkTo: '/page-layout/banner' },
      { title: 'Owned', linkTo: '/tags/owned' },
      { title: 'Favorites', linkTo: '/tags/favorites' }
    ]
  },
  {
    color: 'green lighten-2',
    action: 'list',
    title: 'Tasks',
    items: [
      { title: 'Owned', linkTo: '/page-layout/banner' },
      { title: 'Favorites', linkTo: '/page-layout/banner' }
    ]
  },
  {
    color: 'indigo lighten-2',
    action: 'work',
    title: 'Projects',
    items: [
      { title: 'Owned', linkTo: '/page-layout/banner' },
      { title: 'Favorites', linkTo: '/page-layout/banner' }
    ]
  },
  {
    color: 'brown lighten-2',
    action: 'account_balance_wallet',
    title: 'Wallet',
    items: [
      { title: 'Summary', linkTo: '/wallet/summary' },
      { title: 'Send', linkTo: '/wallet/send' },
      { title: 'Receive', linkTo: '/wallet/receive' },
      { title: 'History', linkTo: '/wallet/history' }
    ]
  },
  {
    color: 'purple lighten-3',
    action: 'contacts',
    title: 'Contacts',
    linkTo: '/favourite-contacts'
  },
  {
    color: 'grey lighten-1',
    action: 'settings',
    title: 'Settings',
    items: [
      { title: 'Theme', linkTo: '/page-layout/banner' },
      { title: 'More', linkTo: '/page-layout/banner' }
    ]
  }
  //  {
  //   color: 'blue darken-2',
  //   action: 'shopping_cart',
  //   title: 'E commerce',
  //   items: [
  //     { title: 'Dashboard', linkTo: '/ecommerce' },
  //     { title: 'Products', linkTo: '/ecommerce/products' },
  //     { title: 'Order Review', linkTo: '/ecommerce/order-review' },
  //   ],
  // },
  // {
  //   color: 'purple darken-2',
  //   action: 'folder',
  //   title: 'UI Elements',
  //   items: [
  //     { title: 'Buttons', linkTo: '/ui/buttons' },
  //     { title: 'App Bars', linkTo: '/ui/app-bars' },
  //     { title: 'Alerts', linkTo: '/ui/alerts' },
  //     { title: 'UI Components', linkTo: '/ui/ui-components' },
  //     { title: 'Cards', linkTo: '/ui/cards' },
  //     { title: 'Chips', linkTo: '/ui/chips' },
  //     { title: 'Sliders', linkTo: '/ui/sliders' },
  //     { title: 'Date Pickers', linkTo: '/ui/date-pickers' },
  //     { title: 'Time Pickers', linkTo: '/ui/time-pickers' },
  //     { title: 'Dialogs', linkTo: '/ui/dialogs' },
  //     { title: 'Tabs', linkTo: '/ui/tabs' },
  //     { title: 'Progress', linkTo: '/ui/progress' },
  //     { title: 'Lists', linkTo: '/ui/lists' },
  //     { title: 'Menus', linkTo: '/ui/menus' },
  //     { title: 'Icons', linkTo: '/ui/icons' },
  //     { title: 'Grid Lists', linkTo: '/ui/grid-lists' },
  //     { title: 'Grids', linkTo: '/ui/grids' },
  //   ],
  // },
  // {
  //   color: 'teal darken-2',
  //   action: 'border_color',
  //   title: 'Forms',
  //   items: [
  //     { title: 'Basic Forms', linkTo: '/forms/basic-forms' },
  //     { title: 'Switches', linkTo: '/forms/switches' },
  //     { title: 'Form Layouts', linkTo: '/forms/form-layouts' },
  //   ],
  // },
  // {
  //   color: 'orange darken-2',
  //   action: 'equalizer',
  //   title: 'Charts',
  //   linkTo: '/charts',
  //    items: [
  //    *   { title: 'Line Charts', linkTo: '/charts/line-charts' },
  //    *   { title: 'Bar Charts', linkTo: '/charts/bar-charts' },
  //    *   { title: 'Area Charts', linkTo: '/charts/area-charts' },
  //    *   { title: 'Pie Charts', linkTo: '/charts/pie-charts' },
  //    *   { title: 'Other Charts', linkTo: '/charts/other-charts' },
  //    * ],
  // },
  // {
  //   color: 'red darken-2',
  //   action: 'list',
  //   title: 'Tables',
  //   items: [
  //     { title: 'Bootstrap Tables', linkTo: '/tables/bootstrap' },
  //     { title: 'User Tables', linkTo: '/tables/user' },
  //   ],
  // },
  // {
  //   color: 'amber darken-2',
  //   action: 'map',
  //   title: 'Maps',
  //   linkTo: '/maps',
  // },
  // {
  //   color: 'grey',
  //   action: 'help',
  //   title: 'About',
  //   items: [
  //     { title: 'Cryptocracy', linkTo: '/pages/about' },
  //     { title: 'Services', linkTo: '/pages/services' },
  //     { title: 'Contact', linkTo: '/pages/contact' },

  //     { title: 'Blog', linkTo: '/pages/blog' },

  //     { title: 'Pricing Table', linkTo: '/pages/pricing' },

  //     { title: 'Faq', linkTo: '/pages/faq' },
  //   ],
  // },
  // {
  //   color: 'lime darken-2',
  //   action: 'widgets',
  //   title: 'Other Pages',
  //   items: [
  //     { title: 'Login', linkTo: '/other-pages/login' },
  //     { title: 'Register', linkTo: '/other-pages/register' },
  //     { title: 'Forgot Password', linkTo: '/other-pages/forgot-password' },
  //     { title: 'Mail Confirm', linkTo: '/other-pages/mail-confirm' },
  //     { title: '404 Page', linkTo: '/other-pages/page-404' },
  //   ],
  // },
  // {
  //   color: 'brown darken-2',
  //   action: 'extension',
  //   title: 'Page Layouts',
  //   items: [
  //     { title: 'Default', linkTo: '/page-layout/default' },
  //     { title: 'Banner', linkTo: '/page-layout/banner' },
  //   ],
  // },
]

export default items
