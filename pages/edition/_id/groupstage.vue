<template>
  <div class="container">
    <div v-if="!isLoading" class="stageSelect bg_Primary pa-1 flex align_center center">
      <fa
        :icon="fas.faCircleArrowLeft"
        class="t-20 pointer text_Alpha selectIcon"
        @click="goToNextStage"
      />
      <select name="select" id v-model="selectedStageIndex" class="mx-3 px-2">
        <option
          :value="index"
          v-for="(stage, index) in groupstage.pages"
          :key="index"
        >{{ stage[`title`] }}</option>
      </select>
      <fa
        :icon="fas.faCircleArrowRight"
        class="t-20 pointer text_Alpha selectIcon"
        @click="goToPreviousStage"
      />
    </div>
    <filterBox
      @filterChanged="filterChanged"
      :fas="fas"
      :initials="{ ...initialFilters }"
      @resetFilters="resetFilters"
      v-if="initialFilters"
    ></filterBox>
    <div v-if="!isLoading">
      <div class="all_pages" v-if="groupstage.pages[selectedStageIndex].title=='ALL'">
        <div class="my-3" v-for="(page, index) in allPages.pools" :key="index">
          <div v-if="page.title != 'ALL'">
            <headline class="mb-3" :text="$t('editions.groupStage.group') + ` ${page.pool}`"></headline>
            <dataTable
              :data="formattingHeading(page.standings)"
              :items="formattingHeading(page.standings).data"
              :headings="formattingHeading(page.standings).headings"
              class="relative"
              initials
            ></dataTable>
          </div>
        </div>
        <div class="my-3">
          <div class="flex align_center my-3">
            <div
              class="flex align_center"
              v-for="(poolLegend, index) in allPages.pools_legend"
              :key="index"
            >
              <div class="square mx-2" :style="{backgroundColor:poolLegend.color}"></div>
              <h4>{{poolLegend[`legend_${$i18n.locale}`]}}</h4>
            </div>
          </div>
          <div class="rank_tables" v-for="(rank, index) in allPages.ranks" :key="index">
            <headline class="mb-3" :text="$t('editions.groupStage.rank')"></headline>
            <dataTable
              :data="formattingHeading(rank.standings)"
              :items="formattingHeading(rank.standings).data"
              :headings="formattingHeading(rank.standings).headings"
              class="relative"
              initials
            ></dataTable>
            <div
              class="flex align_center mt-2"
              v-for="(poolLegend, index) in rank.legend"
              :key="index"
            >
              <div class="square mx-2" :style="{backgroundColor:poolLegend.color}"></div>
              <h4>{{poolLegend[`legend_${$i18n.locale}`]}}</h4>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="selectedPage">
        <div>
          <headline class="mb-3" :text="$t('editions.groupStage.group') + ` ${selectedPage.title}`"></headline>
          <dataTable
            :data="formattingHeading(selectedPage.standings)"
            :items="formattingHeading(selectedPage.standings).data"
            :headings="formattingHeading(selectedPage.standings).headings"
            class="relative"
            initials
          ></dataTable>
          <div class="flex align_center my-2">
            <div
              class="flex align_center"
              v-for="(legend, index) in selectedPage.legend"
              :key="index"
            >
              <div class="square mx-2" :style="{backgroundColor:legend.color}"></div>
              <h4>{{legend[`legend_${$i18n.locale}`]}}</h4>
            </div>
          </div>
          <div v-for="(matchDay, index) in selectedPage.games" :key="index">
            <div
              v-if="matchDay.matchday>=filters.fromMatchDay&&matchDay.matchday<=filters.toMatchDay"
            >
              <subtitle class="mb-3">{{'Game day' + ` ${matchDay.matchday}`}}</subtitle>

              <matchCard
                :fas="fas"
                class="card"
                v-for="(match) in selectedPage.games[index].games"
                :key="match.id"
                :match="match"
              ></matchCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  async fetch() {
    //await this.fetchFiltredGroupStage();
    let id = this.$route.params.id;
    await this.$store.dispatch("edition/fetchDefaultGroupStage", id);
    this.initialFilters = {
      id: this.$route.params.id,
      venue: this.defaultGroupStage.venue,
      fromDate: this.defaultGroupStage.fromDate,
      toDate: this.defaultGroupStage.toDate,
      fromMatchDay: this.defaultGroupStage.fromMatchDay,
      toMatchDay: this.defaultGroupStage.toMatchDay,
      live: this.defaultGroupStage.live
    };
    this.filters = { ...this.initialFilters };
  },
  data() {
    return {
      selectedStageIndex: 0,
      live: false,
      filters: null,
      initialFilters: null
    };
  },
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].groupStage;
    },
    defaultGroupStage() {
      return this.$store.getters["edition/defaultGroupStage"];
    },
    groupstage() {
      let defaultGroupStage = this.$store.getters["edition/defaultGroupStage"];
      let filtredGroupStage = this.$store.getters["edition/groupstage"];
      return filtredGroupStage || defaultGroupStage;
    },
    selectedPage() {
      if (this.groupstage)
        return this.groupstage.pages[this.selectedStageIndex];
      else return null;
    },
    allPages() {
      if (!this.groupstage) return null;
      return this.groupstage.pages.find(page => {
        return page.title == "ALL";
      });
    }
  },
  methods: {
    formattingHeading(standings) {
      let data = [];
      let columns = [];
      let Params = ["Rank", "Pts", "P", "W", "D", "L", "GF", "GA", "GD"];
      if (standings) {
        Params.map(param => {
          let column = { title: "", name: "", sortField: "" };
          if (param == "Rank") {
            column = {
              title: "#",
              name: param,
              sortField: param,
              type: "withColor"
            };
          } else {
            column = {
              title: param,
              name: param,
              sortField: param,
              type: "regular"
            };
          }
          columns.push(column);
        });
        let teamColumn = {
          title: "Team",
          name: "Team",
          id: "",
          sortField: "Team.TeamName",
          type: "complex"
        };
        columns.splice(1, 0, teamColumn);
        // mapping standings
        standings.map(stand => {
          // mapping standing

          data.push({
            ...stand,
            Team: { TeamName: stand.TeamName, TeamIcon: stand.TeamIcon }
          });
        });
      }

      return { headings: columns, data: data };
    },
    filterChanged({ param, value }) {
      this.filters[param] = value;
      this.fetchFiltredGroupStage();
    },
    resetFilters() {
      this.filters = { ...this.initialFilters };
      this.fetchFiltredGroupStage();
    },
    fetchFiltredGroupStage() {
      let id = this.$route.params.id;
      this.$store.dispatch("edition/fetchGroupStage", {
        ...this.filters,
        id: id
      });
    },
    goToNextStage() {
      if (this.selectedStageIndex == this.groupstage.pages.length - 1) {
        this.selectedStageIndex = 0;
      } else {
        this.selectedStageIndex++;
      }
    },
    goToPreviousStage() {
      if (this.selectedStageIndex == 0) {
        this.selectedStageIndex = this.groupstage.pages.length - 1;
      } else {
        this.selectedStageIndex--;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.square {
  width: 1rem;
  height: 1rem;
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
