<template>
  <div class="card bg_Alpha pa-2">
    <subtitle>{{ $t("editions.stats.players") }}</subtitle>
    <div class="flex align_center my-3">
      <div class="w-50 flex align_center center">
        <div class="txt_center">
          <h3 class="text_Primary">{{stats.players}}</h3>
          <h4>Used Players</h4>
        </div>
      </div>
      <div class="w-50 flex align_center center">
        <div class="txt_center">
          <h3
            class="text_Primary"
          >{{stats.type=='nation'?stats.different_leagues:stats.different_nation}}</h3>
          <h4>Different {{stats.type=='nation'?'Leagues':'Nationalities'}}</h4>
        </div>
      </div>
    </div>
    <div class="flex align_center center my-3">
      <div
        class="w-30 flex column align_center"
        v-for="(players, index) in stats.most_occurences"
        :key="index"
      >
        <nuxt-link :to="localePath(`/team/${players.id}`)" :title="stats.team_club_name_latin">
          <avatar selected="true" :url="players.flag" size="32" class="my-1"></avatar>
        </nuxt-link>
        <div class="flex align_center">
          <h3 class="text_Primary mb-1 mr-1">{{players.number}}</h3>
          <h4>Players</h4>
        </div>
        <h4>({{players.percentage}}%)</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["stats"]
};
</script>
<style lang="scss" scoped>
h4 {
  color: map-get($map: $colors, $key: GreyText);
}
</style>
