export const state = () => ({
    player: null,
  });
  export const getters = {
    player(state) {
      return state.player;
    },
  };
  export const actions = {
    async fetchPlayer({ commit, dispatch }, payload) {
      dispatch("loading/chnageLoadingState", { player: true }, { root: true });
      const player = await this.$axios.$get(`/api/player/${payload}`);
  
      commit("setPlayer", player);
      dispatch("loading/chnageLoadingState", { player: false }, { root: true });
    },
  };
  export const mutations = {
    setPlayer(state, payload) {
      state.player = payload;
    },
  };
  