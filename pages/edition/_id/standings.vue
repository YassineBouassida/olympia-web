<template>
  <div class="container">
    <filterBox @filterChanged="filterChanged" :fas="fas" :initials="{ ...filters }"></filterBox>
    <div v-if="!isLoading">
      <div class="my-3">
        <div class="my-3">
          <headline class="mb-3" :text="$t('editions.groupStage.rank')"></headline>
          <dataTable
            :data="formattingHeading(standings.standings)"
            :items="formattingHeading(standings.standings).data"
            :headings="formattingHeading(standings.standings).headings"
            class="relative"
            initials
          ></dataTable>
          <div class="flex align_center wrap">
            <div
              class="flex align_center my-2"
              v-for="(poolLegend, index) in standings.legend"
              :key="index"
            >
              <div class="square mx-2" :style="{backgroundColor:poolLegend.color}"></div>
              <h4>{{poolLegend[`legend_${$i18n.locale}`]}}</h4>
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
    await this.fetchFiltredStandings();
  },
  data() {
    return {
      selectedStageIndex: 0,
      live: false,
      filters: {
        id: this.$route.params.id,
        venue: "N",
        fromDate: "2021-08-13",
        toDate: "2022-05-22",
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
      return this.$store.getters["loading/isLoading"].standings;
    },
    standings() {
      return this.$store.getters["edition/standings"];
    },
    allPages() {
      console.log(this.standings);

      if (!this.standings) return null;
      return this.standings.pages.find(page => {
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
      console.log({ headings: columns, data: data });

      return { headings: columns, data: data };
    },
    filterChanged({ param, value }) {
      console.log("param ", param, " value ", value);
      this.filters[param] = value;
      this.fetchFiltredStandings();
    },
    fetchFiltredStandings() {
      this.$store.dispatch("edition/fetchStandings", this.filters);
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
