<template>
  <div class="headline flex">
    <h1 class="relative pb-1">{{ text }}</h1>
  </div>
</template>
<script>
export default {
  props: ["text"],
};
</script>
<style lang="scss" scoped>
.headline {
  width: 100%;
  border-bottom: 2px solid map-get($map: $colors, $key: BorderLine);

  h1 {
    font-size: 2.5rem;
    font-family: $semiBold;
    color: map-get($map: $colors, $key: Primary);
    bottom: -2px;
    border-bottom: 2px solid map-get($map: $colors, $key: Primary);
    font-variant: small-caps;
  }
}
</style>
