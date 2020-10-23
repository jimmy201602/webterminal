import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import routes from './routes'
import { getAccessToken, getRefreshToken, removeToken, setRefreshToken, RemoveUserInfoFromlocal } from 'src/lib/auth'
import { Notify } from 'quasar'
// import { fasBreadSlice } from '@quasar/extras/fontawesome-v5'
// import { getToken } from '../lib/auth'
// import store from '../store'
// import Util from '../lib/util'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

// const whiteList = ['/login', '/403'] // set white list tp avoid death recursive

// function hasPermission (router, accessMenu) {
//   if (whiteList.indexOf(router.path) !== -1) {
//     return true
//   }
//   const menu = Util.getMenuByName(router.name, accessMenu)
//   if (menu.name) {
//     return true
//   }
//   return false
// }

// Router.beforeEach(async (to, from, next) => {
//   if (getToken()) {
//     const userInfo = store.state.user.userInfo
//     if (!userInfo.name) {
//       try {
//         await store.dispatch('GetUserInfo')
//         await store.dispatch('updateAccessMenu')
//         if (to.path === '/login') {
//           next({ name: 'home_index' })
//         } else {
//           // Util.toDefaultPage([...routers], to.name, router, next);
//           next({ ...to, replace: true })// 菜单权限更新完成,重新进一次当前路由
//         }
//       } catch (e) {
//         if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//           next()
//         } else {
//           next('/login')
//         }
//       }
//     } else {
//       if (to.path === '/login') {
//         next({ name: 'home_index' })
//       } else {
//         if (hasPermission(to, store.getters.accessMenu)) {
//           Util.toDefaultPage(store.getters.accessMenu, to, routes, next)
//         } else {
//           next({ path: '/403', replace: true })
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next('/login')
//     }
//   }
//   const menu = Util.getMenuByName(to.name, store.getters.accessMenu)
//   Util.title(menu.title)
// })

/**
 * Checks if the token is expired.
 * Recovers the payload, decodes the payload with Base64 decode method.
 * Checks the exp field with the current timestamp.
 *
 * @param token {String}
 * @return {boolean}
 */
const expired = token => {
  return JSON.parse(atob(token.split('.')[1])).exp < Math.trunc(Date.now() / 1000)
}

/**
 * If the acces token is expired, the plugin uses this method to refresh this token with the refresh token.
 * Do a axios call on the refresh URL to JWT Server with the refresh token in the data.
 *
 * @return {Promise<void>}
 */
const refresh = async () => {
  await axios({
    url: '/api/token/refresh/',
    method: 'POST',
    data: { refresh: getRefreshToken() }
  })
    .then(response => {
      setRefreshToken(response.data.access)
    })
    .catch(error => {
      console.log(error)
    })
}

Router.beforeEach(
  async (to, from, next) => {
    const token = getAccessToken()
    if (to.name !== 'login' && to.name !== undefined) {
      if (token === undefined || token === null) {
        next({
          name: 'login'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }
)

axios.interceptors.request.use(
  async config => {
    if (config.url.match(/\/token\//)) {
      return config
    }
    if (getAccessToken() !== null) {
      if (expired(getAccessToken())) {
        if (getRefreshToken() !== null) {
          if (expired(getRefreshToken())) {
            Router.push({
              name: 'login',
              query: {
                redirect: Router.history.current.path
              }
            })
          } else {
            await refresh()
          }
        } else {
          Router.push({
            name: 'login',
            query: {
              redirect: Router.history.current.path
            }
          })
        }
      }

      config.headers.Authorization = 'Webterminal-jwt ' + getAccessToken()
    }

    return config
  }, error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        removeToken()
        RemoveUserInfoFromlocal()
        Router.push({
          name: 'login',
          query: {
            redirect: Router.history.current.path
          }
        })
        break
      case 403:
        Notify.create({
          type: 'negative',
          color: 'red-5',
          textColor: 'white',
          multiLine: true,
          message: error.response.data.detail,
          timeout: 5000,
          position: 'top'
        })
        break
      default:
        return Promise.reject(error)
    }
  }
  return Promise.reject(error)
})

Router.afterEach((to) => {
  window.scrollTo(0, 0)
})

export default Router
