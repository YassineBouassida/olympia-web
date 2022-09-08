<template>
  <div class="most_valuable mb-2 bg_White pa-2">
    <subtitle :text="title"></subtitle>
    <div class="flex mt-2 align_center">
      <div class="profile">
        <avatar :url="stats.player_picture" size="120"></avatar>
        <h3 class="text_Primary my-2 w-100 txt_center">{{stats.player_name}}</h3>
        <div class="flex align_center center flags my-2">
          <avatar
            :selected="true"
            :url="'http://olympia.phoinix.ai/pictures/clubs/61.png'"
            size="30"
            class="mx-1"
          ></avatar>
          <avatar
            :selected="true"
            :url="'http://olympia.phoinix.ai/pictures/clubs/61.png'"
            size="30"
            class="mx-1"
          ></avatar>
        </div>
      </div>
      <div class="statistics flex2">
        <div class="flex align_center end w-100 my-2">
          <h4>OLYMPIA RATING</h4>
          <div class="rank bg_Primary ml-2">{{ stats.rating }}</div>
        </div>
        <div class="flex align_center end w-100 my-2" v-for="(attrIndex, index) in 4" :key="index">
          <h4>{{stats[`attribute_${attrIndex}_name`]}}</h4>
          <div
            class="rank text_Primary ml-2"
          >{{stats[`attribute_${attrIndex}_value`]}} {{stats[`attribute_${attrIndex}_unity`]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["stats",'title']
};
</script>
<style lang="scss" scoped>
.rank {
  color: map-get($map: $colors, $key: White);
  border: 1px solid map-get($map: $colors, $key: Primary);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  text-align: center;
  padding: 10px 0;
}
</style>