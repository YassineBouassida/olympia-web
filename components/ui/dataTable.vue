<template>
  <div>
    <!-- <listable
      :headings="headings"
      :data="items"
      :responsive="true"
      :hook="onHook"
      :rowHook="onRowHook"
      class="table"
    />-->
    <vuetable
      class="table"
      ref="vuetable"
      :api-mode="false"
      :fields="headings"
      :data="items"
      :css="table"
    >
      <div slot="Team" slot-scope="props">
        <div class="flex align_center pl-4 team_cel" v-if="props.rowData.Team">
          <img
            :src="
              props.rowData.Team.TeamIcon ||
              'http://olympia.phoinix.ai/pictures/nations/171.png'
            "
            :alt="props.rowData.Team.TeamName"
            @error="imageUrlAlt"
            width="32"
            height="32"
            class="team_image"
          />
          <h4 class="ml-2">{{ props.rowData.Team.TeamName }}</h4>
        </div>
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
    </vuetable>
  </div>
</template>
<script>
import vuetable from "vuetable-2";
import { fas } from "@fortawesome/free-solid-svg-icons";

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
      ascendingIcon: "fa fa-chevron-up",
      descendingIcon: "fa fa-chevron-down",
      ascendingClass: "sorted-asc",
      descendingClass: "sorted-desc",
      sortableIcon: "fa fa-sort",
      detailRowClass: "vuetable-detail-row",
      handleIcon: "fa fa-bars text-secondary",
      renderIcon(classes, options) {
        return `<i class="${classes.join(" ")}" ${options}></span>`;
      }
    }
  }),
  computed: {
    fas() {
      return fas; // NOT RECOMMENDED
    }
  },
  methods: {
    promptProps(p) {
      console.log("props " + JSON.stringify(p));
    },
    imageUrlAlt(event) {
      event.target.src = "http://olympia.phoinix.ai/pictures/nations/48.png";
    },
    onHook(calculated, row, column) {
      if (column == "Team") {
        console.log(calculated);
      }
      // console.info(row);
      // if (column == "id") {
      //   calculated.style.backgroundColor = "rgb(225, 225, 225)";
      // }
      // if (column == "is_new") {
      //   // if row.is_new is true a class new is added
      //   // if row.is_new is false a class new is not added
      //   calculated.class["new"] = row.is_new;
      // }
    },
    onRowHook(calculated, row) {
      // console.info(row);
      // if row.paid is true a class paid is added
      // if row.paid is false a class paid is not added
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
      th {
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
