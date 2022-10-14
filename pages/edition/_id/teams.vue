<template>
  <div class="container" v-if="!isLoading">
    <headline class="my-3" :text="$t('editions.teams.rankings')"></headline>
    <div class="team_list flex wrap space_between">
      <playerCard v-for="(item, index) in teams" :key="index" class="card pa-1 bg_Alpha w-30 ma-2"></playerCard>
    </div>
  </div>
  <loading v-else></loading>
</template>
<script>
export default {
  async fetch() {
    await this.$store.dispatch("edition/fetchTeams", this.$route.params.id);
  },
  computed: {
    isLoading() {
      return this.$store.getters["loading/isLoading"].teams;
    },
    teams() {
      return this.$store.getters["edition/teams"];
    }
  }
};
</script>
<style lang="scss" scoped>
.team_list {
  .card {
    @media (max-width: 1200px) {
      width: calc(50% - 16px) !important;
    }
    @media (max-width: 767px) {
      width: 100% !important;
      margin: 1rem 0 !important;
    }
  }
}
</style>