<template>
  <div class="container">
    <filterBox
      @filterChanged="filterChanged"
      :fas="fas"
      :initials="{ ...initialFilters }"
      @resetFilters="resetFilters"
      v-if="initialFilters"
    ></filterBox>
    <div v-if="!isLoading">
      <div class="my-3">
        <div class="my-3">
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
    //await this.fetchFiltredStandings();
    let id = this.$route.params.id;
    await this.$store.dispatch("edition/fetchDefaultStandings", id);
    this.initialFilters = {
      id: this.$route.params.id,
      venue: this.defaultStandings.venue,
      fromDate: this.defaultStandings.fromDate,
      toDate: this.defaultStandings.toDate,
      fromMatchDay: this.defaultStandings.fromMatchDay,
      toMatchDay: this.defaultStandings.toMatchDay,
      live: this.defaultStandings.live
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
    defaultStandings() {
      return this.$store.getters["edition/defaultStandings"];
    },
    isLoading() {
      return this.$store.getters["loading/isLoading"].standings;
    },
    standings() {
      let defaultStandings = this.$store.getters["edition/defaultStandings"];
      let filtredStandings = this.$store.getters["edition/standings"];
      return filtredStandings || defaultStandings;
    },
    allPages() {
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
      this.fetchFiltredStandings();
    },
    resetFilters() {
      this.filters = { ...this.initialFilters };
      this.fetchFiltredStandings();
    },
    fetchFiltredStandings() {
      let id = this.$route.params.id;
      this.$store.dispatch("edition/fetchStandings", {
        ...this.filters,
        id: id
      });
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
