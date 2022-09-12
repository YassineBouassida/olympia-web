<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27.749"
      height="27.748"
      viewBox="0 0 27.749 27.748"
      :class="{reverse:reverse, close:!reverse}"
    >
      <g transform="translate(-6291.626 -275.126)">
        <path
          class="a"
          d="M26.87,28.37a1.49,1.49,0,0,1-1.061-.439L14.5,16.617,16.617,14.5h0L14.5,12.375,25.809,1.061a1.5,1.5,0,1,1,2.121,2.121L16.617,14.5,27.931,25.809A1.5,1.5,0,0,1,26.87,28.37Zm-24.749,0a1.5,1.5,0,0,1-1.06-2.561L12.375,14.5,14.5,16.617,3.182,27.931A1.491,1.491,0,0,1,2.121,28.37ZM12.375,14.5h0L1.061,3.182A1.5,1.5,0,1,1,3.182,1.061L14.5,12.375,12.375,14.5Z"
          transform="translate(6291.004 274.504)"
        />
        <rect
          class="b"
          width="3.055"
          height="3.055"
          transform="translate(6305.5 286.84) rotate(45)"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    reverse: { type: Boolean, default: false }
  }
};
</script>
<style lang="scss" scoped>
.a {
  fill: #ffffff;
}
.b {
  fill: #fff;
}
.close {
  animation: rotation 1s 0.3s forwards;
}
.reverse {
  animation: rotation_reverse 0.5s 0s forwards;
}
@keyframes rotation {
  to {
    transform: rotate(720deg);
  }
}
@keyframes rotation_reverse {
  to {
    transform: rotate(-720deg);
  }
}
</style>