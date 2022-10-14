<template>
  <div class="card bg_Alpha pa-2">
    <subtitle>{{ $t("editions.stats.goals") }}</subtitle>
    <div class="flex align_center center my-3">
      <div>
        <div class="flex align_center center mb-2">
          <h3 class="text_Primary">{{stats.goals}}</h3>
          <img
            src="http://olympia.phoinix.ai/icos/G.png"
            alt="ball"
            width="32"
            height="32"
          />
        </div>
        <h4>Goals scored (2.32 per game)</h4>
      </div>
    </div>
    <div class="flex align_center center my-3">
      <div class="w-20 flex column align_center">
        <img
          width="32"
          height="32"
          src="http://olympia.phoinix.ai/icos/G_with_L.png"
          alt="G with L"
        />
        <h3 class="text_Primary mt-2">{{stats.left_goals}}</h3>
      </div>
      <div class="w-20 flex column align_center">
        <img
          width="32"
          height="32"
          src="http://olympia.phoinix.ai/icos/G_with_R.png"
          alt="G with R"
        />
        <h3 class="text_Primary mt-2">{{stats.right_goals}}</h3>
      </div>
      <div class="w-20 flex column align_center">
        <img
          width="32"
          height="32"
          src="http://olympia.phoinix.ai/icos/G_with_H.png"
          alt="G with H"
        />
        <h3 class="text_Primary mt-2">{{stats.head_goals}}</h3>
      </div>
      <div class="w-20 flex column align_center">
        <img
          width="32"
          height="32"
          src="http://olympia.phoinix.ai/icos/G_with_B.png"
          alt="G with B"
        />
        <h3 class="text_Primary mt-2">{{stats.other_part_goals}}</h3>
      </div>
      <div class="w-20 flex column align_center">
        <img
          width="32"
          height="32"
          src="http://olympia.phoinix.ai/icos/OG.png"
          alt="OG"
        />
        <h3 class="text_Primary mt-2">{{stats.own_goals}}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['stats']
};
</script>
<style lang="scss" scoped></style>
