import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import LayOut from '../LayOut'
import Login from '../components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: LayOut,
      children: [
        {path: 'hello', name: 'hello', component: Hello},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  linkActiveClass: 'active'
})
