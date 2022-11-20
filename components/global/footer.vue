<template>
  <footer class="footer bg_Primary">
    <div class="container flex align_center space_between fill_height">
      <div class="social_links flex align_center">
        <a href="#" class="text_Alpha mr-2">
          <fa :icon="fab.faFacebook" class="t-12 pointer text_Alpha selectIcon" />
        </a>
        <a href="#" class="text_Alpha mr-2">
          <fa :icon="fab.faInstagram" class="t-12 pointer text_Alpha selectIcon" />
        </a>
        <a href="#" class="text_Alpha mr-2">
          <fa :icon="fab.faYoutube" class="t-12 pointer text_Alpha selectIcon" />
        </a>
        <a href="#" class="text_Alpha mr-2">
          <fa :icon="fab.faTwitter" class="t-12 pointer text_Alpha selectIcon" />
        </a>
      </div>
      <div class="internal_links flex align_center center">
        <nuxt-link class="text_Alpha mx-2" to="/contact">Contact</nuxt-link>
        <nuxt-link class="text_Alpha mx-2" to="/about">About us</nuxt-link>
      </div>
      <div class="powerd_by flex align_center">
        <h4 class="text_Alpha">Powered By</h4>
        <nuxt-link
          :to="localePath(`/`)"
          tag="div"
          class="pointer brand flex align_center center mr-5"
        >
          <img src="@/static/img/brand/logo.png" alt="logo" />
          <img src="@/static/img/brand/logo_type.png" alt="logo type" />
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>
<script>
import { fab } from "@fortawesome/free-brands-svg-icons";

export default {
  computed: {
    fab() {
      return fab;
    }
  }
};
</script>
<style lang="scss">
.footer {
  height: 60px;
  .brand {
    img {
      height: 30px;
    }
  }
}
</style>
