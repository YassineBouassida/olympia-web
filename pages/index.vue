<template>
  <div>
    <!-- Special Stats Section -->
    <section class="special_stats py-4">
      <headline :text="$t('home.specialStats')"></headline>
      <div class="stats_list mt-3 flex wrap align_center space_between">
        <specialStats class="w-45 stat" :stats="playersSpecialStats"></specialStats>
        <specialStats class="w-45 stat" :stats="playersSpecialStats"></specialStats>
      </div>
    </section>
    <!-- Olympia Rewards Top 5 Leagues -->

    <section class="olympia_rewards py-4">
      <headline :text="$t('home.top5')"></headline>
      <div class="flex mt-3 wrap rewards">
        <div class="top_players">
          <mostValuable
            class="classement"
            :stats="mostValuablePlayer"
            :title="$t('home.mostValuablePlayer')"
          ></mostValuable>
          <mostValuable
            class="classement"
            :stats="mostValuablePlayer"
            :title="$t('home.mostValuableGoalkeeper')"
          ></mostValuable>
          <mostValuable
            class="classement"
            :stats="mostValuableYoungPlayer"
            :title="$t('home.mostValuableYoungPlayer')"
          ></mostValuable>
        </div>
        <div class="season_team flex2 bg_White ml-2 pa-2 mb-2 flex column">
          <subtitle text="Team Of The Season"></subtitle>
          <div class="w-100 flex align_center center my-3 flex2">
            <stadium :players="tot"></stadium>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    tot() {
      return this.$store.getters["home/tot"];
    },
    playersSpecialStats() {
      return this.$store.getters["home/playersSpecialStats"];
    },
    mostValuableYoungPlayer() {
      return this.$store.getters["home/mostValuableYoungPlayer"];
    },
    mostValuablePlayer() {
      return this.$store.getters["home/mostValuablePlayer"];
    },
    mostValuableGoalKeeper() {
      return this.$store.getters["home/mostValuableGoalKeeper"];
    }
  },
  async asyncData({ $axios, store }) {
    try {
      store.dispatch("loading/chnageLoadingState", true);

      const tot = await $axios.$get("tots");
      const playersSpecialStats = await $axios.$get("special_stats_player");
      const mostValuableYoungPlayer = await $axios.$get("mvyp");
      const mostValuablePlayer = await $axios.$get("mvp");
      const mostValuableGoalKeeper = await $axios.$get("mvgk");

      store.commit("home/setTot", tot);
      store.commit("home/setPlayersSpecialStats", playersSpecialStats);
      store.commit("home/setMostValuableYoungPlayer", mostValuableYoungPlayer);
      store.commit("home/setMostValuablePlayer", mostValuablePlayer);
      store.commit("home/setMostValuableGoalKeeper", mostValuableGoalKeeper);
      store.dispatch("loading/chnageLoadingState", false);
    } catch (error) {
      store.dispatch("loading/chnageLoadingState", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.most_valuable {
  width: 400px;
}
.stats_list {
  .stat {
    @media (max-width: 1200px) {
      width: 49% !important;
    }
    @media (max-width: 1024px) {
      width: 100% !important;
      margin-bottom: 1rem;
    }
    @media (max-width: 480px) {
      &:deep .avatar {
        width: 50px !important;
        height: 50px !important;
      }
      &:deep .stat_details {
        flex-wrap: wrap !important;
        justify-content: center !important;
      }
    }
  }
}
.rewards {
  @media (max-width: 1024px) {
    .top_players {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .classement {
        width: 100%;
      }
    }
  }
}
</style>
