export const state = () => ({
  loading: false,
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
    state.loading = cmd;
  },
};
