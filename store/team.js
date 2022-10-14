export const state = () => ({
  team: null,
});
export const getters = {
  team(state) {
    return state.team;
  },
};
export const actions = {
  async fetchTeam({ commit, dispatch }, payload) {
    dispatch("loading/chnageLoadingState", { team: true }, { root: true });
    const team = await this.$axios.$get(`/api/team/${payload}`);

    commit("setTeam", team);
    dispatch("loading/chnageLoadingState", { team: false }, { root: true });
  },
};
export const mutations = {
  setTeam(state, payload) {
    state.team = payload;
  },
};
