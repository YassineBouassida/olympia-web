<template>
  <div class="most_valuable mb-2 bg_White pa-2">
    <subtitle>{{title}}</subtitle>
    <div class="flex mt-2 align_center">
      <div class="profile flex column align_center flex2">
        <nuxt-link :to="localePath(`/player/${stats.id}`)" :title="stats.team_club_name_latin">
          <avatar :url="stats.picture" size="120"></avatar>
        </nuxt-link>
        <h3 class="text_Primary my-2 w-100 txt_center">{{stats.name_latin}}</h3>
        <div class="flex align_center center flags my-2 w-100">
          <nuxt-link
            :to="localePath(`/team/${stats.team_club_id}`)"
            :title="stats.team_club_name_latin"
          >
            <avatar :selected="true" :url="stats.team_club_logo" size="30" class="mx-1"></avatar>
          </nuxt-link>
          <nuxt-link
            :to="localePath(`/team/${stats.team_nation_id}`)"
            :title="stats.team_nation_name_latin"
          >
            <avatar :selected="true" :url="stats.team_nation_logo" size="30" class="mx-1"></avatar>
          </nuxt-link>
        </div>
      </div>
      <div class="statistics">
        <div class="flex align_center end w-100 my-2">
          <h4>OLYMPIA RATING</h4>
          <div class="rank bg_Primary ml-2">{{ stats.rating }}</div>
        </div>
        <div class="flex align_center end w-100 my-2">
          <h4>MOTM Awards</h4>
          <div class="rank text_Primary ml-2">{{stats.motm_awards}}</div>
        </div>
        <div class="flex align_center end w-100 my-2">
          <h4>Played Games</h4>
          <div class="rank text_Primary ml-2">{{stats.games_played}}</div>
        </div>
        <div
          class="flex align_center end w-100 my-2"
          v-for="(attr, index) in stats.attributes"
          :key="index"
        >
          <h4>{{attr[`name_${$i18n.locale}`]}}</h4>
          <div class="rank text_Primary ml-2">{{attr.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["stats", "title"]
};
</script>
<style lang="scss" scoped>
.rank {
  color: map-get($map: $colors, $key: White);
  border: 1px solid map-get($map: $colors, $key: Primary);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  text-align: center;
  padding: 10px 0;
}
</style>