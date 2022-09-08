<template>
  <div class="player_position flex column align_center">
    <div class="rating relative">{{profile.rating}}</div>
    <avatar class="avatar" :url="profile.player_picture" size="60"></avatar>
    <div class="player_name relative">{{profile.player_name}}</div>
    <avatar class="flag relative" url="http://olympia.phoinix.ai/pictures/clubs/43.png" size="25"></avatar>
  </div>
</template>
<script>
export default {
  props: ["profile"]
};
</script>
<style lang="scss" scoped>
.player_position {
  .rating {
    background: map-get($map: $colors, $key: White);
    width: 40px;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    bottom: -5px;
  }
  .avatar {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .player_name {
    background: map-get($map: $colors, $key: Text);
    border: 1px solid map-get($map: $colors, $key: White);
    color: map-get($map: $colors, $key: White);
    padding: 3px;
    border-radius: 4px;
    top: -5px;
  }
  .flag {
    top: -12px;
  }
}
</style>