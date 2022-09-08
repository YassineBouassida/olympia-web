export const state = () => ({
  viewPort: 'large'
})
export const getters = {
  viewPort(state) {
    return state.viewPort
  }

}
export const actions = {
  changeViewPort({
    commit
  }, payload) {
    if (payload > 1024) {
      commit('setViewPort', 'large')
    } else if (payload < 1025 && payload > 767) {
      commit('setViewPort', 'sm')

    } else if (payload < 768) {
      commit('setViewPort', 'xs')

    }
  }
}
export const mutations = {
  setViewPort(state, payload) {
    state.viewPort = payload
  }
}
