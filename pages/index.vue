<template>
  <div class="container">
    <section class="game_bar flex start py-4">
      <div class="game_bar_card mx-3 pa-2 pointer" v-for="(game, index) in gameBar" :key="index">
        <div class="flex align_center center">
          <img height="15" width="15" :src="game.edition_logo" @error="imageUrlAlt" alt="game name" />
          <h4 class="t-10">
            <strong>{{game[`edition_name_${$i18n.locale}`]}}</strong>
          </h4>
        </div>
        <h4 class="my-2 txt_center">{{game.datetime}}</h4>
        <div class="flex align_center space_between mt-3">
          <img
            :title="game.team1_name"
            height="40"
            width="40"
            :src="game.team1_icon"
            @error="imageUrlAlt"
            :alt="game.team1_name"
          />
          <h3>:</h3>
          <img
            :title="game.team2_name"
            height="40"
            width="40"
            :src="game.team2_icon"
            @error="imageUrlAlt"
            :alt="game.team1_name"
          />
        </div>
        <h4 class="my-2 txt_center">
          <strong>{{game[`context_${$i18n.locale}`]}}</strong>
        </h4>
      </div>
    </section>
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
          <subtitle>Team Of The Season</subtitle>
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
  methods: {
    imageUrlAlt(event) {
      event.target.src = "https://olympia.phoinix.ai/pictures/editions/1_2.png";
    }
  },
  computed: {
    gameBar() {
      return this.$store.getters["home/gameBar"];
    },
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
  async fetch() {
    this.$store.dispatch("loading/chnageLoadingState", { home: true });
    await this.$store.dispatch("home/fetchGameBar");
    await this.$store.dispatch("home/fetchTot");
    await this.$store.dispatch("home/fetchPlayersSpecialStats");
    await this.$store.dispatch("home/fetchMostValuableYoungPlayer");
    await this.$store.dispatch("home/fetchMostValuablePlayer");
    await this.$store.dispatch("home/fetchMostValuableGoalKeeper");
    this.$store.dispatch("loading/chnageLoadingState", { home: false });
  },
  async asyncData({ $axios, store }) {
    try {
    } catch (error) {
      store.dispatch("loading/chnageLoadingState", { home: false });
    }
  }
};
</script>
<style lang="scss" scoped>
.game_bar {
  overflow-x: auto;
  user-select: none;
  .game_bar_card {
    min-width: 150px;
    min-height: 150px;
    border: 1px solid map-get($map: $colors, $key: Text);
  }
}
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
