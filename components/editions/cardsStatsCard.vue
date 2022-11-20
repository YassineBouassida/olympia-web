<template>
  <div class="card bg_Alpha pa-2 flex column">
    <subtitle>{{ $t("editions.stats.cards") }}</subtitle>

    <div class="flex align_center center my-3 flex2">
      <div class="w-30 flex column align_center">
        <div class="flex align_center">
          <h3 class="text_Primary mb-1">{{stats.yellow_cards}}</h3>
          <img width="32" height="32" src="@/static/img/icons/yellow_card.svg" alt="yellow card" />
        </div>
        <h4 class="t-8">Yellow Cards</h4>
        <h4 class="t-8">(4.07 per game)</h4>
      </div>
      <div class="w-30 flex column align_center">
        <div class="flex align_center">
          <h3 class="text_Primary mb-1">{{stats.second_yellow_cards}}</h3>
          <img
            width="32"
            height="32"
            src="@/static/img/icons/second_yellow_card.svg"
            alt="Second yellowred card"
          />
        </div>
        <h4 class="t-8">Second Yellow Cards</h4>
        <h4 class="t-8">(0.11 per game)</h4>
      </div>
      <div class="w-30 flex column align_center">
        <div class="flex align_center">
          <h3 class="text_Primary mb-1">{{stats.red_cards}}</h3>
          <img width="32" height="32" src="@/static/img/icons/red_card.svg" alt="red card" />
        </div>
        <h4 class="t-8">Red Cards</h4>
        <h4 class="t-8">(0.11 per game)</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["stats"]
};
</script>
<style lang="scss" scoped>
h4 {
  color: map-get($map: $colors, $key: GreyText);
}
</style>
