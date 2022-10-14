<template>
  <div class="card pa-1 bg_Alpha w-30 ma-2">
    <subtitle>Total Shots</subtitle>
    <!-- Card Header -->
    <div class="flex align_center space_around py-2">
      <h4 class="tab pointer">
        <strong>Total</strong>
      </h4>
      <h4 class="tab pointer">Per Game</h4>
    </div>
    <!-- Card Body -->
    <div>
      <div class="first_rank flex align_center space_between pa-2 bg_LightGrey">
        <div>
          <strong class="t-12">1.</strong>
          <strong class="t-12">Italy</strong>
          <strong class="t-15 text_Primary">118</strong>
        </div>
        <avatar url="http://olympia.phoinix.ai/pictures/nations/109.png" size="90" :selected="true"></avatar>
      </div>
      <div class="flex align_center space_between pa-2" v-for="(item, index) in 4" :key="index">
        <div class="pr-3 w-10">
          <strong class="t-12">{{item}}.</strong>
        </div>
        <div class="flex align_center flex2">
          <avatar
            url="http://olympia.phoinix.ai/pictures/nations/203.png"
            size="40"
            :selected="true"
          ></avatar>
          <h4 class="text_Text ml-2">
            <strong>Spain</strong>
          </h4>
        </div>
        <h3 class="text_Primary">108</h3>
      </div>
    </div>
    <!-- Card Footer -->
    <div class="flex align_center end">
      <h4>See Full Rankings</h4>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>