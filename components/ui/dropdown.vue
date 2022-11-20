<template>
  <div class="links_menu flex align_center relative mx-2" v-on-clickaway="closeMenu">
    <h4 class="pointer" @click="opened = !opened">{{ linkGroup[`name_${$i18n.locale}`] }}</h4>
    <div class="drop_down bg_Primary absolute py-1" :class="{ opened: opened }">
      <nuxt-link
        :to="localePath(`/edition/${link.id}`)"
        tag="div"
        class="link pa-2 pointer text_Alpha"
        v-for="(link, index) in linkGroup.editions"
        :key="link.id + index"
        @click.native="closeMenu"
      >{{ link[`name_${$i18n.locale}`] }}</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["linkGroup"],
  data() {
    return {
      opened: false
    };
  },

  methods: {
    closeMenu() {
      this.opened = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.link,
h4 {
  font-variant: small-caps;
}
.links_menu {
  .drop_down {
    top: 0px;
    opacity: 0;
    visibility: hidden;
    display: none;
    z-index: 0;
    width: 100%;
    min-width: 200px;
    margin-right: 20px;
    border-radius: 0 0 8px 8px;
    transition: all 0.5s;
    &.opened {
      display: block;
      top: 57px;
      opacity: 1;
      visibility: visible;
      z-index: 3;
    }
    .link {
      &:hover {
        background: map-get($map: $colors, $key: White);
        color: map-get($map: $colors, $key: Primary) !important;
      }
    }
  }
  & > h4 {
    font-family: $semiBold;
    color: map-get($map: $colors, $key: Alpha);
    user-select: none;

    &:hover {
      color: map-get($map: $colors, $key: Beta);
    }
    &::after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: "";
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
  }
}
</style>
