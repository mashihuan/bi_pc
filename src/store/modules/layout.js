const state = {
  layout: [],
  activeMenu: null
}

const mutations = {
  SAVE_LAYOUT(state, layout) {
    state.layout = layout
  },
  SAVE_ACTIVE_MENU(state, active) {
    state.activeMenu = active
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
