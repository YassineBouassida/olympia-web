export const state = () => ({
  loading: { submenu: false, games: false, home: false },
});
export const getters = {
  isLoading(state) {
    return state.loading;
  },
};
export const actions = {
  chnageLoadingState({ commit }, cmd) {
    commit("setLoading", cmd);
  },
};
export const mutations = {
  setLoading(state, cmd) {
    state.loading = { ...state.loading, ...cmd };
  },
};
