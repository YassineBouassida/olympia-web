<template>
<head class="header flex align_center center">
  <div class="container flex align_center">
    <nuxt-link :to="localePath(`/`)" tag="div" class="pointer brand flex align_center center mr-5">
      <img src="@/static/img/brand/logo.png" alt="logo" />
      <img src="@/static/img/brand/logo_type.png" alt="logo type" />
    </nuxt-link>
    <dropdown v-for="(linkGroup, index) in menu" :key="index" :linkGroup="linkGroup"></dropdown>
  </div>
</head>
</template>
<script>
import { menu } from "@/dummyData/menu";
export default {
  data() {
    return {
      menu: menu
    };
  },
  
  mounted() {
    console.log(this.$i18n.locale);
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 100px;
  background: map-get($map: $colors, $key: Primary);
  .container {
    height: 90%;
    .brand {
      height: 100%;

      img {
        max-height: 100%;
      }
    }
  }
}
</style>
