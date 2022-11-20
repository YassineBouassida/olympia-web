<template>
  <div>
    <vuetable
      class="table"
      ref="vuetable"
      :api-mode="false"
      :fields="headings"
      :css="table"
      :data-manager="dataManager"
    >
      <div slot="Team" slot-scope="props">
        <nuxt-link
          :to="localePath(`/team/${props.rowData.TeamId}`)"
          tag="div"
          class="pointer flex align_center pl-4 team_cel"
          v-if="props.rowData.Team"
        >
          <img
            :src="
              props.rowData.Team.TeamIcon ||
              'http://olympia.phoinix.ai/pictures/nations/0.png'
            "
            :alt="props.rowData.Team.TeamName"
            @error="imageUrlAlt"
            width="32"
            height="32"
            class="team_image"
          />
          <h4 class="ml-2">{{ props.rowData.Team.TeamName }}</h4>
        </nuxt-link>
      </div>
      <div slot="Rank" slot-scope="props" class="h-100">
        <div
          class="h-100 flex align_center center rank"
          v-if="props.rowData.Rank"
          :style="{borderLeft:`3px solid ${props.rowData.Color} !important`}"
          @click="promptProps(props)"
        >
          <h3>{{props.rowData.Rank}}</h3>
        </div>
      </div>
      <div slot="Pts" slot-scope="props" class="h-100">
        <div class="h-100 flex align_center center rank" v-if="props.rowData.Pts!=undefined">
          <h3>{{props.rowData.Pts}}</h3>
        </div>
      </div>
    </vuetable>
  </div>
</template>
<script>
import vuetable from "vuetable-2";
import { fas } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
export default {
  components: { vuetable },
  props: ["headings", "items"],
  data: () => ({
    table: {
      tableWrapper: "",
      tableHeaderClass: "mb-0",
      tableBodyClass: "mb-0",
      tableClass: "table table-bordered table-hover",
      loadingClass: "loading",
      ascendingIcon: "faChevronUp",
      descendingIcon: "faChevronDown",
      ascendingClass: "sortedAsc",
      descendingClass: "sortedDesc",
      sortableIcon: "faSort",
      detailRowClass: "vuetable-detail-row",
      handleIcon: "fa fa-bars text-secondary",
      renderIcon(classes, options) {
        let fa = fas[classes[1]];

        return `<svg data-v-2b9768fe="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="${fa.iconName}" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fa.icon[0]} ${fa.icon[1]}" class="t-12 pointer text_Alpha selectIcon svg-inline--fa fa-circle-arrow-left fa-w-16"><path data-v-2b9768fe="" fill="currentColor" d="${fa.icon[4]}" class=""></path></svg>`;
      }
    }
  }),
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    }
  },
  methods: {
    promptProps(p) {},
    imageUrlAlt(event) {
      event.target.src = "https://olympia-api.phoinix.ai/pictures/clubs/0.png";
    },
    dataManager(sortOrder, pagination) {
      if (this.items.length < 1) return;

      let local = this.items;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      return local;
    },
    onHook(calculated, row, column) {
      if (column == "Team") {
        console.log(calculated);
      }
    },
    onRowHook(calculated, row) {
      calculated.class["paid"] = row.is_paid;
    }
  }
};
</script>
<style lang="scss" scoped>
.table {
  @media (max-width: 480px) {
  }
  &:deep table {
    height: 1px;
    width: 100%;
    thead {
      background: map-get($map: $colors, $key: Primary);
      color: map-get($map: $colors, $key: White);
      height: 2rem;
      .vuetable-th-slot-_team {
        width: 28% !important;
      }
      th {
        width: 8%;
        @media (max-width: 767px) {
          padding: 0.5rem;
        }
        @media (max-width: 480px) {
          padding: 0.2rem;
        }
      }
    }
    tbody {
      tr {
        background: map-get($map: $colors, $key: White);

        td:not(:first-of-type),
        .rank {
          text-align: center;
          @media (max-width: 767px) {
            padding: 0.5rem;
          }
          @media (max-width: 480px) {
            padding: 0.2rem;
          }
        }
        @media (max-width: 767px) {
          .team_image {
            width: 25px;
            height: 25px;
          }
          .team_cel {
            flex-direction: column;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      }
    }
  }
}
</style>
