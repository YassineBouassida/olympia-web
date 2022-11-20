<template>
  <div v-if="!isLoading">
    <div class="tabs_nav" :class="{stickyTab:sticky}">
      <div class="flex align_center container">
        <nuxt-link
          tag="div"
          class="flex align_center center tab_logo pointer"
          :to="localePath(`/edition/${id}`)"
        >
          <img :src="submenu.logo" alt="euro 2020" />
        </nuxt-link>
        <nuxt-link
          :to="localePath(`/edition/${id}${link.link}`)"
          tag="h4"
          class="link pa-2 px-4 pointer text_Primary fill_height"
          v-for="(link, index) in submenu.items"
          :key="index"
        >{{ link[`name_${$i18n.locale}`] }}</nuxt-link>
      </div>
    </div>

    <nuxt />
  </div>
  <loading v-else></loading>
</template>
<script>
export default {
  computed: {
    sticky() {
      return this.$store.getters["style/stickyHeader"];
    },
    id() {
      return this.$route.params.id;
    },
    submenu() {
      const result = this.$store.getters["edition/subMenu"];
      return result;
    },
    stats() {
      const result = this.$store.getters["edition/stats"];
      return result;
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].submenu;
    }
  },
  async fetch() {
    await this.$store.dispatch("edition/fetchSubMenu", this.$route.params.id);
    await this.$store.dispatch("edition/fetchStats", this.$route.params.id);
    await this.$store.dispatch("edition/fetchTot", this.$route.params.id);
    await this.$store.dispatch(
      "edition/fetchMostValuableYoungPlayer",
      this.$route.params.id
    );
    await this.$store.dispatch(
      "edition/fetchMostValuablePlayer",
      this.$route.params.id
    );
    await this.$store.dispatch(
      "edition/fetchMostValuableGoalKeeper",
      this.$route.params.id
    );
  }
};
</script>
<style lang="scss" scoped>
.tabs_nav {
  .nuxt-link-exact-active {
    height: 100%;
    background: map-get($map: $colors, $key: Primary);
    color: map-get($map: $colors, $key: White) !important;
    &.tab_logo {
      background: map-get($map: $colors, $key: LightGrey);
      border-bottom: none !important;
    }
  }
  &.stickyTab {
    top: 100px;
  }
  position: sticky;
  top: 0;
  border-bottom: 2px solid map-get($map: $colors, $key: Primary);
  background: map-get($map: $colors, $key: LightGrey);
  z-index: 99;
  .link {
    line-height: 50px;
    height: 100%;
  }
  @media (max-width: 1024px) {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .link {
      min-width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 375px) {
      .link {
        min-width: 120px;
      }
    }
  }

  .container {
    height: 60px;
    .tab_logo {
      height: 100%;
      width: 100px;
      img {
        height: 90%;
      }
    }
  }
}
</style>
