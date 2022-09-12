<template>
  <div>
    <div class="flex align_center tabs_nav">
      <nuxt-link
        tag="div"
        class="flex align_center center tab_logo pointer"
        :to="localePath(`/edition/${id}`)"
      >
        <img src="http://olympia.phoinix.ai/pictures/editions/1_2.png" alt="euro 2020" />
      </nuxt-link>
      <nuxt-link
        :to="localePath(`/edition/${id}/${link.link}`)"
        tag="h4"
        class="link pa-2 pointer text_Primary"
        v-for="(link, index) in tabLinks"
        :key="link.key + index"
      >{{ link[`name_${$i18n.locale}`] }}</nuxt-link>
    </div>
    <div class="progress_tab my-3">
      <h4 class="txt_right my-1">
        Completed Games:
        <strong>51</strong>
      </h4>
      <div class="progress_bar bg_Primary w-100"></div>
      <h4 class="txt_right my-1">
        Scheduled Games:
        <strong>51</strong>
      </h4>
    </div>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabLinks: [
        { key: 1, name_en: "Games", link: "games" },
        { key: 2, name_en: "Group Stage", link: "group-stage" },
        { key: 3, name_en: "Knock Out Stage", link: "knock-out-stage" },
        { key: 4, name_en: "Teams", link: "teams" },
        { key: 5, name_en: "Players", link: "players" }
      ]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs_nav {
  height: 60px;
  border-bottom: 5px solid map-get($map: $colors, $key: Primary);
  .tab_logo {
    height: 100%;
    width: 100px;
    img {
      height: 90%;
    }
  }
}
.progress_bar {
  height: 10px;
  border-radius: 5px;
}
</style>