import {
  tot,
  playersSpecialStats,
  mostValuablePlayer,
  mostValuableGoalKeeper,
} from "@/dummyData/home";
export const state = () => ({
  tot: tot,
  playersSpecialStats: playersSpecialStats,
  mostValuableYoungPlayer: mostValuablePlayer,
  mostValuablePlayer: mostValuablePlayer,
  mostValuableGoalKeeper: mostValuableGoalKeeper,
  gameBar: [],
});
export const getters = {
  tot(state) {
    return state.tot;
  },
  playersSpecialStats(state) {
    return state.playersSpecialStats;
  },
  mostValuableYoungPlayer(state) {
    return state.mostValuableYoungPlayer;
  },
  mostValuablePlayer(state) {
    return state.mostValuablePlayer;
  },
  mostValuableGoalKeeper(state) {
    return state.mostValuableGoalKeeper;
  },
  gameBar(state) {
    return state.gameBar;
  },
};
export const actions = {
  async fetchGameBar({ commit }) {
    const gameBar = await this.$axios.$get(`/api/games_bar`);
    commit("setGameBar", gameBar);
  },
  async fetchTot({ commit }) {
    const tot = await this.$axios.$get(`/api/tots`);
    commit("setTot", tot);
  },
  async fetchPlayersSpecialStats({ commit }) {
    const playersSpecialStats = await this.$axios.$get(
      `/api/special_stats_players`
    );
    commit("setPlayersSpecialStats", playersSpecialStats);
  },
  async fetchMostValuableYoungPlayer({ commit }) {
    const mostValuableYoungPlayer = await this.$axios.$get(`/api/mvyp`);
    commit("setMostValuableYoungPlayer", mostValuableYoungPlayer);
  },
  async fetchMostValuablePlayer({ commit }) {
    const mostValuablePlayer = await this.$axios.$get(`/api/mvp`);
    commit("setMostValuablePlayer", mostValuablePlayer);
  },
  async fetchMostValuableGoalKeeper({ commit }) {
    const mostValuableGoalKeeper = await this.$axios.$get(`/api/mvgk`);
    commit("setMostValuableGoalKeeper", mostValuableGoalKeeper);
  },
};
export const mutations = {
  setGameBar(state, payload) {
    state.gameBar = payload;
  },
  setTot(state, payload) {
    state.tot = payload;
  },
  setPlayersSpecialStats(state, payload) {
    state.playersSpecialStats = payload;
  },
  setMostValuableYoungPlayer(state, payload) {
    state.mostValuableYoungPlayer = payload;
  },
  setMostValuablePlayer(state, payload) {
    state.mostValuablePlayer = payload;
  },
  setMostValuableGoalKeeper(state, payload) {
    state.mostValuableGoalKeeper = payload;
  },
};
