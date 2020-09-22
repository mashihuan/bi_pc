const state = {
  theme: ''
}

const mutations = {
  CHANGE_THEME(state, theme) {
    state.theme = theme
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
