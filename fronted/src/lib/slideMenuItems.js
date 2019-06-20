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
        name: '헬로화면',
        router: {
          name: 'Hello'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '샘플화면',
        router: {
          name: 'Sample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Dashboard v1',
        router: {
          name: 'DashboardV1'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Dashboard v2',
        router: {
          name: 'DashboardV2'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'InfoBox',
        router: {
          name: 'InfoBoxExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Chart.js',
        router: {
          name: 'ChartExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Alert',
        router: {
          name: 'AlertExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Modal',
        router: {
          name: 'ModalExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'APIExample',
        router: {
          name: 'APIExample'
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
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Boxed',
        link: 'https://adminlte.io/themes/AdminLTE/pages/layout/boxed.html'
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Fixed',
        link: 'https://adminlte.io/themes/AdminLTE/pages/layout/fixed.html'
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Collapsed Sidebar',
        link: 'https://adminlte.io/themes/AdminLTE/pages/layout/collapsed-sidebar.html'
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
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Icons',
        router: {
          name: 'Icons'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Buttons',
        router: {
          name: 'Buttons'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Sliders',
        router: {
          name: 'Sliders'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Timeline',
        router: {
          name: 'Timeline'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Modals',
        router: {
          name: 'Modals'
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
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Advanced Elements',
        router: {
          name: 'AdvancedElements'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Editors',
        link: 'pages/forms/editors.html'
      }
    ]
  }
]
