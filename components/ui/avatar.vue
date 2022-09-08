<template>
  <div
    class="avatar"
    :class="{ selected: selected }"
    :style="{
      backgroundImage: `url(${url})`,
      width: `${size}px`,
      height: `${size}px`,
    }"
  ></div>
</template>
<script>
export default {
  props: ["selected", "url", "size"],
};
</script>
<style lang="scss" scoped>
.avatar {
  border-radius: 100%;
  border: 2px solid map-get($map: $colors, $key: Primary);
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
}
.selected {
  border: 2px solid map-get($map: $colors, $key: BorderLine);
}
</style>
