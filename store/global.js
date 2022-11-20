export const state = () => ({
  menu: {},
});
export const getters = {
  menu(state) {
    return state.menu;
  },
};
export const actions = {
  async fetchMenu({ commit, dispatch }) {
    console.log("fetch menu");
    dispatch("loading/chnageLoadingState", { menu: true }, { root: true });

    const menu = await this.$axios.$get(`/menu`);

    commit("setMenu", menu);

    dispatch("loading/chnageLoadingState", { menu: false }, { root: true });
  },
};
export const mutations = {
  setMenu(state, payload) {
    state.menu = payload;
  },
};
