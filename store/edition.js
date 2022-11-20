import {
  tot,
  playersSpecialStats,
  mostValuablePlayer,
  mostValuableGoalKeeper,
} from "@/dummyData/home";
export const state = () => ({
  selectedEdititionId: null,
  subMenu: null,
  stats: null,
  games: null,
  teams: null,
  players: null,
  groupstage: null,
  defaultgGoupStage: null,
  standings: null,
  defaultStandings: null,
  knockoutstage: null,
  mostValuableYoungPlayer: mostValuablePlayer,
  mostValuablePlayer: mostValuablePlayer,
  mostValuableGoalKeeper: mostValuableGoalKeeper,
  tot: tot,
});
export const getters = {
  selectedEdititionId(state) {
    return state.selectedEdititionId;
  },
  subMenu(state) {
    return state.subMenu;
  },
  stats(state) {
    return state.stats;
  },
  games(state) {
    return state.games;
  },
  teams(state) {
    return state.teams;
  },
  players(state) {
    return state.players;
  },
  standings(state) {
    return state.standings;
  },
  groupstage(state) {
    return state.groupstage;
  },
  defaultGroupStage(state) {
    return state.defaultgGoupStage;
  },
  defaultStandings(state) {
    return state.defaultStandings;
  },
  knockoutstage(state) {
    return state.knockoutstage;
  },
  tot(state) {
    return state.tot;
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
export const actions = {
  async fetchTot({ commit }, payload) {
    const tot = await this.$axios.$get(`/api/edition/${payload}/tots`);
    commit("setTot", tot);
  },

  async fetchMostValuableYoungPlayer({ commit }, payload) {
    const mostValuableYoungPlayer = await this.$axios.$get(
      `/api/edition/${payload}/mvyp`
    );
    commit("setMostValuableYoungPlayer", mostValuableYoungPlayer);
  },
  async fetchMostValuablePlayer({ commit }, payload) {
    const mostValuablePlayer = await this.$axios.$get(
      `/api/edition/${payload}/mvp`
    );
    commit("setMostValuablePlayer", mostValuablePlayer);
  },
  async fetchMostValuableGoalKeeper({ commit }, payload) {
    const mostValuableGoalKeeper = await this.$axios.$get(
      `/api/edition/${payload}/mvgk`
    );
    commit("setMostValuableGoalKeeper", mostValuableGoalKeeper);
  },
  changeSelectedEdition({ commit }, payload) {
    commit("setSelectedEdition", payload);
  },
  async fetchStats({ dispatch, commit }, payload) {
    dispatch("loading/chnageLoadingState", { stats: true }, { root: true });

    const stats = await this.$axios.$get(`/api/edition/${payload}/stats`);
    commit("setStats", stats);

    dispatch("loading/chnageLoadingState", { stats: false }, { root: true });
  },
  async fetchSubMenu({ dispatch, commit }, payload) {
    dispatch("loading/chnageLoadingState", { submenu: true }, { root: true });

    const subMenu = await this.$axios.$get(`/api/edition/${payload}/submenu`);
    commit("setSubMenu", subMenu);

    dispatch("loading/chnageLoadingState", { submenu: false }, { root: true });
  },
  async fetchGames({ commit, dispatch }, payload) {
    dispatch("loading/chnageLoadingState", { games: true }, { root: true });

    const games = await this.$axios.$get(`/api/edition/${payload}/games`);
    commit("setGames", games);
    dispatch("loading/chnageLoadingState", { games: false }, { root: true });
  },
  async fetchKnockOutStage({ commit, dispatch }, payload) {
    dispatch(
      "loading/chnageLoadingState",
      { knockOutStage: true },
      { root: true }
    );

    const knockOutStage = await this.$axios.$get(
      `/api/edition/${payload}/knockoutstage`
    );
    commit("setKnockOutStage", knockOutStage);
    dispatch(
      "loading/chnageLoadingState",
      { knockOutStage: false },
      { root: true }
    );
  },
  async fetchTeams({ commit, dispatch }, payload) {
    dispatch("loading/chnageLoadingState", { teams: true }, { root: true });

    const teams = await this.$axios.$get(`/api/edition/${payload}/teams`);
    commit("setTeams", teams);

    dispatch("loading/chnageLoadingState", { teams: true }, { root: true });
  },
  async fetchPlayers({ commit, dispatch }, payload) {
    dispatch("loading/chnageLoadingState", { players: true }, { root: true });

    const players = await this.$axios.$get(`/api/edition/${payload}/players`);
    commit("setPlayers", players);

    dispatch("loading/chnageLoadingState", { players: false }, { root: true });
  },
  async fetchDefaultGroupStage({ commit, dispatch }, payload) {
    dispatch(
      "loading/chnageLoadingState",
      { groupStage: true },
      { root: true }
    );

    const groupStage = await this.$axios.$get(
      `/api/edition/${payload}/groupstage`
    );
    commit("setDefaultGroupStage", groupStage);

    dispatch(
      "loading/chnageLoadingState",
      { groupStage: false },
      { root: true }
    );
  },
  async fetchGroupStage(
    { commit, dispatch },
    {
      id = 1,
      venue = "N",
      fromDate = "2021-06-11",
      toDate = "2021-07-14",
      fromMatchDay = 1,
      toMatchDay = 3,
      live = false,
    }
  ) {
    dispatch(
      "loading/chnageLoadingState",
      { groupStage: true },
      { root: true }
    );

    const groupStage = await this.$axios.$get(
      `/api/edition/${id}/groupstage/${venue}/${fromDate}/${toDate}/${fromMatchDay}/${toMatchDay}/live=${
        live ? 1 : 0
      }`
    );
    commit("setGroupStage", groupStage);
    dispatch(
      "loading/chnageLoadingState",
      { groupStage: false },
      { root: true }
    );
  },
  async fetchDefaultStandings({ commit, dispatch }, payload) {
    dispatch("loading/chnageLoadingState", { standings: true }, { root: true });

    const standings = await this.$axios.$get(
      `/api/edition/${payload}/standings`
    );
    commit("setDefaultStandings", standings);

    dispatch(
      "loading/chnageLoadingState",
      { standings: false },
      { root: true }
    );
  },
  async fetchStandings(
    { commit, dispatch },
    {
      id = this.$route.params.id,
      venue = "N",
      fromDate = "2021-06-11",
      toDate = "2021-07-14",
      fromMatchDay = 1,
      toMatchDay = 3,
      live = false,
    }
  ) {
    dispatch("loading/chnageLoadingState", { standings: true }, { root: true });
    console.log("fetchStandings ");

    const standings = await this.$axios.$get(
      `/api/edition/${id}/standings/${venue}/${fromDate}/${toDate}/${fromMatchDay}/${toMatchDay}/live`
    );
    commit("setStandings", standings);
    dispatch(
      "loading/chnageLoadingState",
      { standings: false },
      { root: true }
    );
  },
};
export const mutations = {
  setSelectedEdition(state, payload) {
    state.selectedEdititionId = payload;
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
  setSubMenu(state, payload) {
    state.subMenu = { ...payload };
  },
  setStats(state, payload) {
    state.stats = { ...payload };
  },
  setGames(state, payload) {
    state.games = payload;
  },
  setTeams(state, payload) {
    state.teams = payload;
  },
  setPlayers(state, payload) {
    state.players = payload;
  },
  setGroupStage(state, payload) {
    state.groupstage = payload;
  },
  setDefaultGroupStage(state, payload) {
    state.defaultgGoupStage = payload;
  },
  setDefaultStandings(state, payload) {
    state.defaultStandings = payload;
  },
  setStandings(state, payload) {
    state.standings = payload;
  },
  setKnockOutStage(state, payload) {
    state.knockoutstage = payload;
  },
};
