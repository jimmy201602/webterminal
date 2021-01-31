
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'home', name: 'home', component: () => import('pages/Home.vue') },
      { path: 'commandexecute', name: 'play_arrow', component: () => import('pages/CommandExecute.vue') },
      { path: 'batchcommandexecute', name: 'playlist_play', component: () => import('pages/BatchCommandExecute.vue') },
      { path: 'credentials', name: 'credential', component: () => import('pages/Credential.vue') },
      { path: 'servers', name: 'server', component: () => import('pages/Server.vue') },
      { path: 'groups', name: 'group', component: () => import('pages/Group.vue') },
      { path: 'commands', name: 'command', component: () => import('pages/Command.vue') },
      { path: 'logs', name: 'log', component: () => import('pages/Log.vue') },
      { path: 'users', name: 'user', component: () => import('pages/User.vue') },
      { path: 'permissions', name: 'permission', component: () => import('pages/Permission.vue') },
      { path: 'settings', name: 'setting', component: () => import('pages/Setting.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/webterminal/:id/',
    name: 'webterminal',
    component: () => import('../pages/WebTerminal')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
