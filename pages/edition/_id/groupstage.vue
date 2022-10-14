<template>
  <div class="container">
    <filterBox @filterChanged="filterChanged" :fas="fas" :initials="{ ...filters }"></filterBox>
    <div v-if="!isLoading">
      <div class="my-3" v-for="(page, index) in groupstage.pages" :key="index">
        <div v-if="page.title != 'ALL'">
          <headline class="mb-3" :text="$t('editions.groupStage.group') + ` ${page.title}`"></headline>
          <dataTable
            :data="formattingHeading(page.standings)"
            :items="formattingHeading(page.standings).data"
            :headings="formattingHeading(page.standings).headings"
            class="relative"
            initials
          ></dataTable>
        </div>
      </div>
      <div class="my-3" v-if="allPages">
        <div class="flex align_center my-3">
          <div
            class="flex align_center"
            v-for="(poolLegend, index) in allPages.pools_legend"
            :key="index"
          >
            <div class="square mx-2" :style="{backgroundColor:poolLegend.color}"></div>
            <h4>{{poolLegend.legend}}</h4>
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
    await this.fetchFiltredGroupStage();
  },
  data() {
    return {
      selectedStageIndex: 0,
      live: false,
      filters: {
        id: 1,
        venue: "N",
        fromDate: "2021-06-11",
        toDate: "2021-07-14",
        fromMatchDay: 1,
        toMatchDay: 3
      }
    };
  },
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].groupStage;
    },
    groupstage() {
      return this.$store.getters["edition/groupstage"];
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
      if (standings) {
        Object.keys(standings[0]).map(param => {
          const unusedParam = [
            "Color",
            "DP",
            "Live",
            "MaxRank",
            "MinRank",
            "PP",
            "Pool",
            "Pos",
            "RC",
            "SYC",
            "YC",
            "TeamName",
            "TeamId",
            "TeamIcon"
          ];

          let column = { title: "", name: "", sortField: "" };
          if (unusedParam.indexOf(param) == -1) {
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
            columns.unshift(column);
          }
        });
        let teamColumn = {
          title: "Team",
          name: "Team",
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
    fetchFiltredGroupStage() {
      this.$store.dispatch("edition/fetchGroupStage", this.filters);
    }
  }
};
</script>
<style lang="scss" scoped>
.square {
  width: 1rem;
  height: 1rem;
}
</style>
