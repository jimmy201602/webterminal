import * as types from '../mutation-types'

const state = {
  main: []
}

const mutations = {
  [types.FETCH_PRODUCT] (state, products) {
    state.main = products
  }
}

export default {
  state,
  mutations
}
