<template>
  <div class="flex column app" :class="{ rtl: rtl, ltr: !rtl }" v-if="!isLoading">
    <Header class="header" :class="{ sticky: sticky }"></Header>
    <nuxt class="main" />
    <Footer></Footer>
  </div>
  <loading v-else></loading>
</template>
<style lang="scss">
@import "~/static/scss/global.scss";
.sticky {
  position: sticky;
  top: 0;
  z-index: 9999999;
}

.app {
  min-height: 100vh;
}
.main,
.loading_screen {
  flex-grow: 2;
}
</style>
<script>
import Vue from "vue";
import global from "~/mixins/global.js";
Vue.mixin(global);
export default {
  name: "defaultLayout",
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${process.env.hostname}${this.$route.path}`
        }
      ]
    };
  },
  async fetch() {
    await this.$store.dispatch("global/fetchMenu");
  },
  data() {
    return {
      lastScrollY: 0,
      sticky: false
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", () => {
      this.$store.dispatch("style/changeViewPort", window.innerWidth);
    });
  },
  mounted() {
    this.$store.dispatch("style/changeViewPort", window.innerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(y) {
      if (this.lastScrollY > window.scrollY && window.scrollY > 100) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
      this.lastScrollY = window.scrollY;
      this.$store.dispatch("style/changeStickyHeader", this.sticky);
    }
  },
  computed: {
    rtl() {
      return this.$i18n.localeProperties.dir == "rtl";
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].menu;
    }
  }
};
</script>
