<template>
  <div class="player_position flex column align_center">
    <div class="rating relative">{{profile.rating}}</div>
    <nuxt-link :to="localePath(`/player/${profile.player_id}`)" :title="profile.player_name_latin">
      <avatar class="avatar" :url="profile.player_picture" size="60"></avatar>
    </nuxt-link>
    <div class="player_name relative txt_center">{{profile.player_name_latin}}</div>
    <nuxt-link :to="localePath(`/team/${profile.team_club_id}`)" :title="profile.team_club_id">
      <avatar class="flag relative" :url="profile.team_club_logo" size="25"></avatar>
    </nuxt-link>
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
    flex-shrink: 0;
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
  @media (max-width: 660px) {
    .player_name {
      font-size: 0.9rem;
    }
    .avatar {
      width: 50px !important;
      height: 50px !important;
    }
    .flag {
      width: 15px !important;
      height: 15px !important;
    }
  }
  @media (max-width: 480px) {
    .player_name {
      font-size: 0.7rem;
    }
    .avatar {
      width: 40px !important;
      height: 40px !important;
    }
    .flag {
      width: 15px !important;
      height: 15px !important;
    }
  }
}
</style>