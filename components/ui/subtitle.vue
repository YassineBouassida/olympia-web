<template>
  <div class="headline flex">
    <h3 class="relative pb-1">{{ text }}</h3>
  </div>
</template>
<script>
export default {
  props: ["text"]
};
</script>
<style lang="scss" scoped>
.headline {
  width: 100%;
  border-bottom: 1px solid map-get($map: $colors, $key: Primary);

  h3 {
    font-size: 1.25rem;
    font-family: $light;
    color: map-get($map: $colors, $key: Primary);
  }
}
</style>
