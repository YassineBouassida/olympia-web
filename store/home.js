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
};
export const actions = {};
export const mutations = {
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
