<template>
<head class="header flex align_center center">
  <div class="container flex align_center">
    <nuxt-link :to="localePath(`/`)" tag="div" class="pointer brand flex align_center center mr-5">
      <img src="@/static/img/brand/logo.png" alt="logo" />
      <img src="@/static/img/brand/logo_type.png" alt="logo type" />
    </nuxt-link>
    <!-- Desktop links -->
    <dropdown
      v-for="(linkGroup, index) in menu"
      :key="index"
      :linkGroup="linkGroup"
      class="desktop"
    ></dropdown>
    <!-- ********************** -->
    <!-- Mobile burguer menu -->

    <fBtn class="bg_Primary burger mobile" @click.native="openMenu=!openMenu">
      <div class="flex column fill_height center">
        <div class="line bg_White"></div>
        <div class="line bg_White"></div>
        <div class="line bg_White"></div>
      </div>
    </fBtn>
    <!-- ********************** -->
  </div>
  <!-- Mobile Nav drawer -->
  <div class="nav_drawer bg_Primary px-3 mobile" :class="{opened:openMenu}" id="navDrawer">
    <close class="close_sign" :reverse="!openMenu" @click.native="openMenu=false"></close>
    <div class="links_list relative">
      <div class="txt_center" v-for="(linkGroup, index) in menu" :key="index">
        <h3 class="pointer links_title text_White py-3">{{ linkGroup[`name_${$i18n.locale}`] }}</h3>
        <div class="txt_center">
          <nuxt-link
            @click.native="openMenu=false"
            :to="localePath(`/edition/${link.id}`)"
            tag="div"
            class="link pa-2 pointer text_White"
            v-for="(link, index) in linkGroup.editions"
            :key="link.id + index"
          >{{ link[`name_${$i18n.locale}`] }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>

  <!-- ********************** -->
</head>
</template>
<script>
import { menu } from "@/dummyData/menu";
export default {
  data() {
    return {
      openMenu: false
    };
  },
  
  mounted() {
    console.log(this.$i18n.locale);
  },
  computed: {
    viewPort() {
      return this.$store.getters["style/viewPort"];
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].menu;
    },
    menu() {
      return this.$store.getters["global/menu"];
    }
  },
  watch: {
    viewPort: {
      handler: size => {
        if (size == "sm" || size == "xs") {
          let navdrawerContainer = document.getElementById("navDrawer");
          let windowHeight = window.innerHeight;
          navdrawerContainer.style.height = windowHeight + "px";
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  .link,
  .links_title {
    font-variant: small-caps;
  }
  height: 100px;
  background: map-get($map: $colors, $key: Primary);
  .container {
    height: 90%;
    @media (max-width: 1024px) {
      justify-content: space-between;
    }
    .brand {
      height: 100%;

      img {
        max-height: 100%;
      }
    }
    .burger {
      width: 2.5rem;
      height: 2.125rem;
      .line {
        height: 2px;
        border-radius: 4px;
        margin: 3px 0;
        @media (max-width: 375px) {
          margin: 2px 0;
        }
      }
    }
  }
  .nav_drawer {
    position: fixed;
    bottom: -100%;
    height: 100vh;
    transition: 0.5s all;
    width: 100%;
    z-index: 99;
  }
  .opened {
    bottom: 0px;
  }
  .close_sign {
    display: block;
    position: absolute;
    top: 2rem;
    right: 2rem;
    transition: 2s all;
    z-index: 99;
    user-select: none;
    cursor: pointer;
  }
  .links_list {
    top: 5rem;
    .links_title {
      border-bottom: $border;
      border-top: $border;
    }
  }
}
</style>
