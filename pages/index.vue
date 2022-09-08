<template>
  <div>
    <!-- Special Stats Section -->
    <section class="special_stats py-4">
      <headline :text="$t('home.specialStats')"></headline>
      <div class="stats_list mt-3 flex wrap align_center space_between">
        <specialStats class="w-45" :stats="playersSpecialStats"></specialStats>
        <specialStats class="w-45" :stats="playersSpecialStats"></specialStats>
      </div>
    </section>
    <!-- Olympia Rewards Top 5 Leagues -->

    <section class="olympia_rewards py-4">
      <headline :text="$t('home.top5')"></headline>
      <div class="flex mt-3">
        <div class="top_players">
          <mostValuable :stats="mostValuablePlayer" :title="$t('home.mostValuablePlayer')"></mostValuable>
          <mostValuable :stats="mostValuablePlayer" :title="$t('home.mostValuableGoalkeeper')"></mostValuable>
          <mostValuable
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
import { playersSpecialStats, mostValuablePlayer } from "@/dummyData/home";
export default {
  data() {
    return {};
  },
  async asyncData({ $axios }) {
    const tot = await $axios.$get("https://olympia-api.phoinix.ai/tots");
    const playersSpecialStats = await $axios.$get(
      "https://olympia-api.phoinix.ai/special_stats_player"
    );
    const mostValuableYoungPlayer = await $axios.$get(
      "https://olympia-api.phoinix.ai/mvyp"
    );
    const mostValuablePlayer = await $axios.$get(
      "https://olympia-api.phoinix.ai/mvp"
    );
    const mostValuableGoalKeeper = await $axios.$get(
      "https://olympia-api.phoinix.ai/mvgk"
    );

    return {
      playersSpecialStats,
      tot,
      mostValuableGoalKeeper,
      mostValuablePlayer,
      mostValuableYoungPlayer
    };
  }
};
</script>
<style lang="scss" scoped>
.most_valuable {
  width: 400px;
}
</style>
