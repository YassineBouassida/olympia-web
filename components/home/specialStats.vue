<template>
  <div class="stats bg_White ">
    <div class="flex align_center space_between pa-2">
      <avatar
        v-for="(element, index) in stats"
        :key="index"
        :url="element.player_picture"
        size="80"
        :selected="selectedStatIndex == index"
        class="pointer"
        @click.native="selectedStatIndex = index"
      ></avatar>
    </div>
    <div class="stat_details flex align_center space_between pa-2">
      <img
        class="element_large_picture"
        :src="selectedStat.player_picture"
        :alt="selectedStat.player_name_latin"
      />
      <div class="w-100">
        <div class="flex2">
          <div class="column align_center flex">
            <h3 class="py-1">{{ selectedStat.player_name_latin }}</h3>
            <h4 class="py-1">{{ selectedStat[`title_${$i18n.locale}`] }}</h4>
            <h4>
              <u>{{ selectedStat[`competition_${$i18n.locale}`] }}</u>
            </h4>
          </div>
        </div>
        <div class="standing">
          <div
            class="flex align_center space_around ranking py-1"
            v-for="(ranking, index) in selectedStat.standings"
            :key="index"
          >
            <div class="rank mr-4">{{ ranking.rank }}</div>
            <div class="name_flag flex align_center flex2">
              <img
                class="flag"
                :src="ranking.picture"
                :alt="ranking.name_latin"
              />
              {{ ranking.name_latin }}
            </div>
            <strong>9</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["stats"],
  data() {
    return {
      selectedStatIndex: 0,
    };
  },
  computed: {
    selectedStat() {
      return this.stats && this.stats[this.selectedStatIndex];
    },
  },
};
</script>
<style lang="scss" scoped>
.stat_details {
  border-top: 1px solid map-get($map: $colors, $key: BorderLine);
  .element_large_picture {
    height: 120px;
  }
  .ranking {
    border-bottom: 1px solid map-get($map: $colors, $key: Primary);
    .rank {
      color: map-get($map: $colors, $key: White);
      background: map-get($map: $colors, $key: Primary);
      width: 20px;
      height: 20px;
      border-radius: 4px;
      text-align: center;
      padding: 3px 0;
    }
    .flag {
      height: 20px;
    }
  }
}
</style>
