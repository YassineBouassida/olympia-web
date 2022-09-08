<template>
  <div class="bg_white flex align_center">
    <div class="container">
      <div class="flex align_center space_between wrap">
        <div class="img_404 w-50"></div>
        <div class="w-45 flex column align_center">
          <h1 class="hero_text txt_center">{{$t('common.error.oops')}}</h1>
          <h1 class="text_primary txt_center">{{$t('common.error.sthg')}}</h1>
          <p class="txt_center">{{$t('common.error.noWorries')}}</p>
          <fBtn
            class="bg_primary text_white w-50"
            link
            :to="localePath('/')"
          >{{$t('common.error.link')}}</fBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "empty",
  mounted() {
    console.log(this.error);
  }
  // you can set a custom layout for the error page
};
</script>
<style lang="scss" scoped>
.img_404 {
  img {
    max-width: 100%;
  }
}
.hero_text {
  font-size: 9.5rem;
}
@media (max-width: 1024px) {
  .img_404,
  .w-45 {
    width: 100% !important;
  }
  .hero_text {
    font-size: 8.5rem;
  }
}
</style>