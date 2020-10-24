import Vue from 'vue'
import Vuex from 'vuex'

import state from './modules/state'
import * as mutations from './modules/mutations'
import * as actions from './modules/actions'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
    },
    state: state,
    mutations: {
      ...mutations
    },
    actions: {
      ...actions
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
