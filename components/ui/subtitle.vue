<template>
  <div class="headline flex">
    <h3 class="relative pb-1">
      <slot></slot>
    </h3>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.headline {
  width: 100%;
  border-bottom: 1px solid map-get($map: $colors, $key: Primary);

  h3 {
    font-size: 1.25rem;
    font-family: $light;
    color: map-get($map: $colors, $key: Primary);
    font-variant: small-caps;
  }
}
</style>
