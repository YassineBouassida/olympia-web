<template>
  <div class="logo" :class="{dark:dark}">
    <svg xmlns="http://www.w3.org/2000/svg" width="143.999" height="40" viewBox="0 0 143.999 40">
      <g transform="translate(-233 -51.223)">
        <g transform="translate(42.409 -337.543)">
          <path
            class="a"
            d="M190.591,394.733H224.4a5.967,5.967,0,0,0,5.967-5.967H190.591Z"
            transform="translate(0 0)"
          />
          <path
            class="a"
            d="M684.311,388.766H646.523a5.983,5.983,0,0,0,5.966,6h25.855v34h5.967v-40Z"
            transform="translate(-349.721)"
          />
          <rect class="a" width="5.967" height="27.844" transform="translate(316.69 400.759)" />
          <rect class="a" width="5.967" height="27.844" transform="translate(304.618 400.759)" />
          <rect class="a" width="5.967" height="27.844" transform="translate(259.607 400.759)" />
          <path
            class="a"
            d="M420.222,394.733h27.844a5.967,5.967,0,0,0,5.967-5.967H414.256A5.966,5.966,0,0,0,420.222,394.733Z"
            transform="translate(-171.554 0)"
          />
          <path
            class="a"
            d="M196.16,439.677h-5.569v27.844h5.966V445.644h20.018a5.967,5.967,0,0,0,5.967-5.967H196.16Z"
            transform="translate(0 -38.918)"
          />
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    dark: Boolean
  }
};
</script>
<style lang="scss" scoped>
.logo .a {
  fill: map-get($map: $colors, $key: primary);
}
.dark .a {
  fill: map-get($map: $colors, $key: white) !important;
}
</style>