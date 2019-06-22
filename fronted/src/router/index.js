import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import LayOut from '../LayOut.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: LayOut,
      children: [
        {path: 'ownspace', name: 'ownspace_index', title: '个人中心', component: Hello}
      ]
    }
  ],
  linkActiveClass: 'active'
})
