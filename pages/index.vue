<template>
  <div class="container" v-if="!isLoading">
    <section class="game_bar flex start py-4">
      <div
        class="game_bar_card mx-3 pa-2"
        v-for="(game, index) in gameBar"
        :key="index"
        :style="{border: `2px solid ${game.status_color}`}"
      >
        <nuxt-link
          :to="localePath(`/edition/${game.edition_id}`)"
          tag="div"
          class="pointer flex align_center center"
        >
          <img height="15" width="15" :src="game.edition_logo" @error="imageUrlAlt" alt="game name" />
          <h5 class="t-10">
            <strong>{{game[`edition_name_${$i18n.locale}`]}}</strong>
          </h5>
        </nuxt-link>
        <h5 class="my-2 txt_center">{{game.datetime}}</h5>
        <div class="flex align_center space_between mt-2">
          <nuxt-link :to="localePath(`/player/${game.team1_id}`)" class="pointer" tag="div">
            <img
              :title="game.team1_name"
              height="40"
              width="40"
              :src="game.team1_icon"
              @error="imageUrlAlt"
              :alt="game.team1_name"
            />
          </nuxt-link>

          <h3>:</h3>
          <nuxt-link :to="localePath(`/player/${game.team2_id}`)" class="pointer" tag="div">
            <img
              :title="game.team2_name"
              height="40"
              width="40"
              :src="game.team2_icon"
              @error="imageUrlAlt"
              :alt="game.team1_name"
            />
          </nuxt-link>
        </div>
        <h5 class="my-1 txt_center">
          <strong>{{game[`context_${$i18n.locale}`]}}</strong>
        </h5>

        <nuxt-link tag="h5" to="#" class="txt_center pointer">
          <fa :icon="fas.faArrowUpRightFromSquare" class="t-9" />
        </nuxt-link>
      </div>
    </section>
    <!-- Special Stats Section -->
    <section class="special_stats py-4">
      <headline :text="$t('home.specialStats')"></headline>
      <div class="stats_list mt-3 flex wrap align_center space_between">
        <specialStats class="stat" :stats="playersSpecialStats"></specialStats>
        <specialStats class="stat" :stats="playersSpecialStats"></specialStats>
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
  <loading v-else></loading>
</template>

<script>
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {};
  },
  methods: {
    imageUrlAlt(event) {
      event.target.src = "https://olympia-api.phoinix.ai/pictures/clubs/0.png";
    }
  },
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    },
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
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].home;
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
section {
  border-bottom: 2px solid map-get($map: $colors, $key: BorderLine);
  margin-bottom: 10px;
}
.game_bar {
  overflow-x: auto;
  user-select: none;
  .game_bar_card {
    width: 150px;
    height: 150px;
    border: 1px solid map-get($map: $colors, $key: Text);
    flex-shrink: 0;
  }
}
.most_valuable {
  width: 400px;
}
.stats_list {
  .stat {
    width: 49% !important;

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
