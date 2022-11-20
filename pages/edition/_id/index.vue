<template>
  <div class="container" v-if="stats">
    <div class="progress_tab my-3">
      <h4 class="txt_right my-1">
        Completed Games:
        <strong>{{stats.completed_games}}</strong>
      </h4>
      <div class="progress_bar bg_Primary w-100"></div>
      <h4 class="txt_right my-1">
        Scheduled Games:
        <strong>{{stats.all_games}}</strong>
      </h4>
    </div>
    <!-- Key stats  -->
    <section class="olympia_rewards py-4">
      <headline :text="$t('editions.keyStats')"></headline>
      <div class="flex space_between mt-2 stats_list">
        <playersStatsCard class="stat" :stats="stats"></playersStatsCard>
        <goalStatsCard class="stat" :stats="stats"></goalStatsCard>
        <cardsStatsCard class="stat" :stats="stats"></cardsStatsCard>
      </div>
    </section>
    <!-- Olympia Rewards Top 5 Leagues -->

    <section class="olympia_rewards py-4">
      <headline :text="$t('editions.rewards')"></headline>
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
          <subtitle>Team Of The Season</subtitle>
          <div class="w-100 flex align_center center my-3 flex2">
            <stadium :players="tot"></stadium>
          </div>
        </div>
      </div>
    </section>
  </div>
  <loading v-else></loading>
</template>
<script>
export default {
  computed: {
    stats() {
      return this.$store.getters["edition/stats"];
    },
    tot() {
      return this.$store.getters["edition/tot"];
    },
    mostValuableYoungPlayer() {
      return this.$store.getters["edition/mostValuableYoungPlayer"];
    },
    mostValuablePlayer() {
      return this.$store.getters["edition/mostValuablePlayer"];
    },
    mostValuableGoalKeeper() {
      return this.$store.getters["edition/mostValuableGoalKeeper"];
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].stats;
    }
  }
};
</script>
<style lang="scss" scoped>
.most_valuable {
  width: 400px;
}
.progress_bar {
  height: 10px;
  border-radius: 5px;
}
.stats_list {
  flex-wrap: wrap;
  .stat {
    width: 32% !important;
    @media (max-width: 1200px) {
      width: 49% !important;
      margin-bottom: 1rem;
    }
    @media (max-width: 1024px) {
      width: 100% !important;
      margin-bottom: 1rem;
      height: 200px;
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
