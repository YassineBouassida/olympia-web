<template>
  <div v-if="!isLoading">
    <div class="stageSelect bg_Primary pa-1 flex align_center center">
      <fa
        :icon="fas.faCircleArrowLeft"
        class="t-20 pointer text_Alpha selectIcon"
        @click="goToNextStage"
      />
      <select name="select" id v-model="selectedStageIndex" class="mx-3 px-2">
        <option
          :value="index"
          v-for="(stage, index) in knockoutstage"
          :key="index"
        >{{ stage[`title_${$i18n.locale}`] }}</option>
      </select>
      <fa
        :icon="fas.faCircleArrowRight"
        class="t-20 pointer text_Alpha selectIcon"
        @click="goToPreviousStage"
      />
    </div>
    <div class="container py-3">
      <matchCard
        :fas="fas"
        class="card"
        v-for="(match) in selectedStage.games"
        :key="match.id"
        :match="match"
      ></matchCard>

      <div class="summary pb-3">
        <headline :text="$t('editions.games.summary')"></headline>
        <div class="flex space_between mt-3 card_list">
          <!-- completed games -->
          <div class="card bg_Alpha pa-3 flex column align_center center">
            <h3 class="txt_center">Completed Game</h3>
            <h2 class="text_Primary mt-2">{{ selectedStage.stats["games_completed"] }}</h2>
          </div>
          <!-- Goals games -->
          <div class="card bg_Alpha pa-3 flex column align_center center">
            <img src="@/static/img/icons/football.svg" width="32" height="32" alt="live games" />
            <h2 class="text_Primary mt-2">{{ selectedStage.stats["goals"] }}</h2>
          </div>
          <!-- Own goals games -->
          <div class="card bg_Alpha pa-3 flex column align_center center">
            <img src="@/static/img/icons/own_goal.svg" width="32" height="32" alt="live games" />
            <h2 class="text_Primary mt-2">{{ selectedStage.stats["own_goals"] }}</h2>
          </div>
          <!-- Yellow cards games -->
          <div class="card bg_Alpha pa-3 flex column align_center center">
            <img src="@/static/img/icons/yellow_card.svg" width="32" height="32" alt="live games" />
            <h2 class="text_Primary mt-2">{{ selectedStage.stats["yellow_cards"] }}</h2>
          </div>
          <!-- Second yellow games -->
          <div class="card bg_Alpha pa-3 flex column align_center center">
            <img
              src="@/static/img/icons/second_yellow_card.svg"
              width="32"
              height="32"
              alt="live games"
            />
            <h2 class="text_Primary mt-2">{{ selectedStage.stats["second_yellow_cards"] }}</h2>
          </div>
          <!-- Red cards games -->
          <div class="card bg_Alpha pa-3 flex column align_center center">
            <img src="@/static/img/icons/red_card.svg" width="32" height="32" alt="live games" />
            <h2 class="text_Primary mt-2">{{ selectedStage.stats["red_cards"] }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <loading v-else></loading>
</template>
<script>
import { fas } from "@fortawesome/free-solid-svg-icons";
export default {
  async fetch() {
    await this.$store.dispatch(
      "edition/fetchKnockOutStage",
      this.$route.params.id
    );
    this.knockoutstage.map((stage, index) => {
      if (stage.default) this.selectedStageIndex = index;
    });
  },
  data() {
    return {
      selectedStageIndex: 0
    };
  },
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    },

    isLoading() {
      return this.$store.getters["loading/isLoading"].knockOutStage;
    },
    knockoutstage() {
      return this.$store.getters["edition/knockoutstage"];
    },
    selectedStage() {
      return this.knockoutstage[this.selectedStageIndex];
    }
  },
  methods: {
    goToNextStage() {
      if (this.selectedStageIndex == this.knockoutstage.length - 1) {
        this.selectedStageIndex = 0;
      } else {
        this.selectedStageIndex++;
      }
    },
    goToPreviousStage() {
      if (this.selectedStageIndex == 0) {
        this.selectedStageIndex = this.knockoutstage.length - 1;
      } else {
        this.selectedStageIndex--;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
h3 {
  font-variant: small-caps;
}
.summary {
  border-bottom: 2px solid map-get($map: $colors, $key: BorderLine);

  .card {
    width: 16%;
  }
  @media (max-width: 1024px) {
    .card_list {
      flex-wrap: wrap;
      justify-content: center;
      .card {
        width: 25%;
        margin-bottom: 1rem;
        margin-right: 1rem;
      }
    }
    @media (max-width: 767px) {
      .card_list {
        flex-wrap: wrap;
        .card {
          width: 47%;
          margin-bottom: 1rem;
          margin-right: 1.5%;
        }
      }
      @media (max-width: 480px) {
        .card_list {
          .card {
            width: 100%;
          }
        }
      }
    }
  }
}
.selectIcon {
  &:hover {
    color: map-get($map: $colors, $key: White) !important;
  }
}
select {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 5px;
  width: 350px;
  height: 28px;
  text-align: center;

  &:focus > option:hover,
  &:focus > option:focus {
    background: map-get($map: $colors, $key: White) !important;
  }
  option {
    background-color: map-get($map: $colors, $key: Primary);
  }
}
</style>
