<template>
  <div class="flex column app" :class="{ rtl: rtl, ltr: !rtl }">
    <Header class="header" :class="{sticky:sticky}"></Header>
    <div v-if="isLoading" class="loading_screen">Loading ....</div>
    <nuxt v-else class="main container" />
  </div>
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
    }
  },
  computed: {
    rtl() {
      return this.$i18n.localeProperties.dir == "rtl";
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"];
    }
  }
};
</script>
