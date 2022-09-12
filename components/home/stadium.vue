<template>
  <div class="stadium pa-3">
    <div class="row flex first center">
      <playerPosition class="mx-2" id="ST" :profile="findByPos('ST')"></playerPosition>
    </div>
    <div class="row flex second"></div>
    <div class="row flex third space_between">
      <playerPosition class="mx-2" id="LW" :profile="findByPos('LW')"></playerPosition>
      <playerPosition class="mx-2" id="CM-L" :profile="findByPos('CM-L')"></playerPosition>
      <playerPosition class="mx-2" id="CM-R" :profile="findByPos('CM-R')"></playerPosition>
      <playerPosition class="mx-2" id="RW" :profile="findByPos('RW')"></playerPosition>
    </div>
    <div class="row flex forth center">
      <playerPosition class="mx-2" id="CM" :profile="findByPos('CM')"></playerPosition>
    </div>
    <div class="row flex fifth space_between">
      <playerPosition class="mx-2" id="CD-L" :profile="findByPos('CD-L')"></playerPosition>
      <playerPosition class="mx-2" id="LB" :profile="findByPos('LB')"></playerPosition>
      <playerPosition class="mx-2" id="RB" :profile="findByPos('RB')"></playerPosition>
      <playerPosition class="mx-2" id="CD-R" :profile="findByPos('CD-R')"></playerPosition>
    </div>
    <div class="row flex sixth center">
      <playerPosition class="mx-2" id="GK" :profile="findByPos('GK')"></playerPosition>
    </div>
  </div>
</template>
<script>
export default {
  props: ["players"],
  methods: {
    findByPos(pos) {
      return this.players.find(player => player.position === pos);
    }
  }
};
</script>
<style lang="scss">
.stadium {
  width: fit-content;

  background-image: url("http://olympia.phoinix.ai/pictures/stadium.jpeg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.row {
}
</style>