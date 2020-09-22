import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import getters from './getters'
import user from './modules/user'
import layout from './modules/layout'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules: {
    user,
    layout,
    theme
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
