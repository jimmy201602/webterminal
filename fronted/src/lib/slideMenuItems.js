module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'tree',
    icon: 'fa fa-dashboard',
    name: 'Dashboard',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Hello',
        router: {
          name: 'hello'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Login',
        router: {
          name: 'login'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-files-o',
    name: 'Layout Options',
    badge: {
      type: 'Number',
      data: 4
    },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Top Navigation',
        link: 'https://adminlte.io/themes/AdminLTE/pages/layout/top-nav.html'
      }
    ]
  },
  {
    type: 'item',
    icon: 'fa fa-th',
    name: 'Widgets',
    badge: {
      type: 'String',
      data: 'new'
    },
    router: {
      name: 'WidgetsExample'
    }
  },
  {
    type: 'tree',
    icon: 'fa fa-laptop',
    name: 'UI Elements',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'General',
        router: {
          name: 'General'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-edit',
    name: 'Forms',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'General Elements',
        router: {
          name: 'GeneralElements'
        }
      }
    ]
  }
]
