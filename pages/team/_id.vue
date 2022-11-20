<template>
  <div class="container py-3" v-if="!isLoading">
    <section class="nation_info py-2">
      <headline :text="$t(`${team.type}.info`)"></headline>
      <div class="info_panel flex wrap align_center space_between bg_Alpha pa-2 my-2">
        <div class="flex align_center info_line">
          <Avatar
            class="mr-2 team_avatar"
            url="http://olympia.phoinix.ai/pictures/nations/0.png"
            :selected="true"
            size="60"
          ></Avatar>
          <h1>{{team[`name_${$i18n.locale}`]}}</h1>
        </div>
        <div class="flex align_center mx-3 info_line">
          <fa :icon="fas.faLandmarkDome" class="t-14 pointer selectIcon" />
          <h4 class="ml-1">{{team[`stadium_${$i18n.locale}`]}}</h4>
        </div>
        <div class="flex align_center mx-3 info_line">
          <fa :icon="fas.faLocationPin" class="t-14 pointer selectIcon" />
          <h4 class="ml-1">{{team[`city_${$i18n.locale}`]}}</h4>
        </div>
        <div class="flex align_center mx-3 info_line">
          <fa :icon="fas.faCakeCandles" class="t-14 pointer selectIcon" />
          <h4 class="ml-1">{{team[`foundation`]}}</h4>
        </div>
        <div class="flex align_center mx-3 info_line">
          <fa :icon="fas.faGlobe" class="t-14 pointer selectIcon" />
          <a :href="team[`webste`]" class="ml-1 text_Text" target="blank">{{team[`webste`]}}</a>
        </div>
      </div>
    </section>
    <!-- <div class="tabToggle flex align_center bg_Primary pa-1 mt-4">
      <div
        @click="changeTab('euroChampion')"
        class="tab pointer pa-2 text_White"
        :class="{active:openTab=='euroChampion'}"
      >{{$t('nation.euroChampion')}}</div>
      <div
        @click="changeTab('nationLeague')"
        class="tab pointer pa-2 text_White"
        :class="{active:openTab=='nationLeague'}"
      >{{$t('nation.nationLeague')}}</div>
    </div>-->
    <section class="nation_info py-2 my-3">
      <headline :text="$t('nation.championship.squad')"></headline>
      <div class="flex wrap space_around squad pa-3 bg_Alpha">
        <div
          class="player mx-3 relative txt_center flex column align_center"
          v-for="(player, index) in team.players"
          :key="index"
        >
          <h3 class="player_num bg_White">{{player.number}}</h3>
          <Avatar selected="true" class="avatar" :url="player.picture" size="108"></Avatar>
          <div class="name_position bg_White px-4">
            <h5 class="my-1">{{player['name_latin']}}</h5>
            <h5 class="my-1">GB</h5>
          </div>
        </div>
      </div>
    </section>
    
    <section class="games my-3">
      <headline :text="$t('nation.championship.games')"></headline>
      <matchCard
        :fas="fas"
        class="card"
        v-for="(match) in team.games"
        :key="match.id"
        :match="match"
      >
       <nuxt-link :to="`/edition/${match.edition_id}`" tag="h5" class="pointer" slot="editionLink">
          {{match[`edition_name_${$i18n.locale}`] }}
          <fa :icon="fas.faArrowUpRightFromSquare" class="t-9" />
        </nuxt-link>
      </matchCard>
    </section>
   
  </div>
  <loading v-else></loading>
</template>
<script>
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  async fetch() {
    await this.$store.dispatch("team/fetchTeam", this.$route.params.id);
  },
  data() {
    return {
      openTab: "euroChampion"
    };
  },
  methods: {
    changeTab(tabName) {
      this.openTab = tabName;
    }
  },
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].team;
    },
    team() {
      return this.$store.getters["team/team"];
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  border-bottom: 3px solid map-get($map: $colors, $key: BorderLine);
  padding: 1rem 0 !important;
}
.tabToggle {
  width: fit-content;
  border-radius: 20px;
  font-weight: bold;
}
.active {
  background: map-get($map: $colors, $key: White);
  border-radius: 20px;
  color: map-get($map: $colors, $key: Primary) !important;
}
.name_position {
  border: 1px solid map-get($map: $colors, $key: BorderLine);
  border-radius: 25px;
  position: relative;
  top: -15px;
}
.player_num {
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid map-get($map: $colors, $key: BorderLine);
  position: absolute;
  z-index: 3;
  top: 3px;
  margin-right: 72px;
}
.avatar {
  position: relative;
}
.team_avatar {
  border: none !important;
}
.info_panel {
  @media (max-width: 1024px) {
    flex-direction: column;
    .info_line {
      width: 100%;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>