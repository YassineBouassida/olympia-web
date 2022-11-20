<template>
  <div class="container py-3" v-if="!isLoading">
    <section class="flex align_center center my-3">
      <div class="player_card bg_Primary pa-2">
        <div class="inner_card bg_Beta py-2">
          <div class="inner_head flex align_center center mb-2">
            <img
              @error="imageUrlAlt"
              width="150"
              height="150"
              :src="player.picture"
              :alt="player.name_latin"
            />
          </div>
          <div class="inner_title py-2">
            <h3 class="text_Primary txt_center">{{player.name_latin}}</h3>
          </div>
          <div class="flex align_center center py-2">
            <nuxt-link :to="localePath(`/team/${player.club_team_id}`)" tag="div" class="pointer">
              <Avatar class="mx-1" size="25" :url="player.club_logo" selected="true"></Avatar>
            </nuxt-link>

            <nuxt-link :to="localePath(`/team/${player.nation_team_id}`)" tag="div" class="pointer">
              <Avatar class="mx-1" size="25" :url="player.nation_flag" selected="true"></Avatar>
            </nuxt-link>
          </div>
          <div class="inner_info flex">
            <div class="w-50 flex column align_center">
              <div class="flex align_center column my-2">
                <fa :icon="fas.faCrosshairs"></fa>
                <h4 class="mt-1">{{player.position}}</h4>
              </div>
              <div class="flex align_center column my-2">
                <fa :icon="fas.faArrowsUpDown"></fa>
                <h4 class="mt-1">{{parseFloat(player.height/100).toFixed(2)}}m</h4>
              </div>
              <div class="flex align_center column my-2">
                <fa :icon="fas.faCakeCandles"></fa>
                <h4 class="mt-1">{{player.birthday}}</h4>
              </div>
            </div>
            <div class="w-50 flex column">
              <div v-if="player.foot=='R'" class="flex align_center column my-2">
                <img
                  width="16"
                  height="16"
                  src="@/static/img/icons/player_right_foot_highlight.svg"
                  alt="player right foot highlight"
                />

                <h4 class="mt-1">Right Foot</h4>
              </div>
              <div v-if="player.foot=='L'" class="flex align_center column my-2">
                <img
                  width="16"
                  height="16"
                  src="@/static/img/icons/player_left_foot_highlight.svg"
                  alt="player right foot highlight"
                />

                <h4 class="mt-1">Left Foot</h4>
              </div>
              <div class="flex align_center column my-2">
                <fa :icon="fas.faWeightScale"></fa>
                <h4 class="mt-1">{{player.weight}}Kg</h4>
              </div>
              <div class="flex align_center column my-2">
                <fa :icon="fas.faLocationDot"></fa>
                <h4 class="mt-1 flex column align_center">
                  <span>{{player[`birth_city_name_latin`]}}</span>
                  <nuxt-link
                    :to="localePath(`/team/${player.nation_team_id}`)"
                    tag="div"
                    class="pointer"
                  >
                    <Avatar class="mx-1" size="25" :url="player.nation_flag" selected="true"></Avatar>
                  </nuxt-link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-3">
      <headline :text="$t('player.games')"></headline>
      <matchCard
        :fas="fas"
        class="card"
        v-for="(match) in player.games"
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
    await this.$store.dispatch("player/fetchPlayer", this.$route.params.id);
  },
  data() {
    return {
      openTab: "euroChampion"
    };
  },
  methods: {
    changeTab(tabName) {
      this.openTab = tabName;
    },
    imageUrlAlt(event) {
      event.target.src =
        "https://olympia-api.phoinix.ai/pictures/players/0.jpg";
    }
  },
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].player;
    },
    player() {
      return this.$store.getters["player/player"];
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  border-bottom: 3px solid map-get($map: $colors, $key: BorderLine);
  padding: 1rem 0 !important;
}
.player_card {
  height: 440px;
  width: 260px;
  border-radius: 20px;
  .inner_card {
    height: 100%;
    width: 100%;
    border-radius: inherit;
  }
  .inner_title {
    border-top: 1px solid map-get($map: $colors, $key: Primary);
    border-bottom: 1px solid map-get($map: $colors, $key: Primary);
  }
}
</style>