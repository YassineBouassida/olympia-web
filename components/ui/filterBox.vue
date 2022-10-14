<template>
  <div class="bg_Alpha pa-2 my-2">
    <h3>{{$t('editions.groupStage.filterBy')}}</h3>
    <div class="flex align_center space_between field_list">
      <div class="field mx-2 flex2">
        <h5 class="my-2 text_GreyText">{{$t('editions.groupStage.homeAway')}}</h5>
        <select
          v-model="homeAway"
          @change="onParamChanged('venue',$event.target.value)"
          class="w-100"
          name="homeAway"
          id="homeAway"
        >
          <option value="H">{{$t('editions.groupStage.home')}}</option>
          <option value="A">{{$t('editions.groupStage.away')}}</option>
          <option value="N">{{$t('editions.groupStage.overAll')}}</option>
        </select>
      </div>
      <div class="field mx-2 flex2">
        <h5 class="my-2 text_GreyText">{{$t('editions.groupStage.startingDate')}}</h5>
        <input
          v-model="startingDate"
          @change="onParamChanged('fromDate',$event.target.value)"
          class="w-100"
          type="date"
          name="startingDate"
          id="startingDate"
        />
      </div>
      <div class="field mx-2 flex2">
        <h5 class="my-2 text_GreyText">{{$t('editions.groupStage.endingDate')}}</h5>
        <input
          v-model="endingDate"
          @change="onParamChanged('toDate',$event.target.value)"
          class="w-100"
          type="date"
          name="endingDate"
          id="endingDate"
        />
      </div>
      <div class="field mx-2 flex2">
        <h5 class="my-2 text_GreyText">{{$t('editions.groupStage.startingGameDay')}}</h5>
        <select
          v-model="startingGameDay"
          @change="onParamChanged('fromMatchDay',$event.target.value)"
          class="w-100"
          name="startingGameDay"
          id="startingGameDay"
        >
          <option :value="item" v-for="(item, index) in 3" :key="index">{{'Match Day'+item}}</option>
        </select>
      </div>
      <div class="field mx-2 flex2">
        <h5 class="my-2 text_GreyText">{{$t('editions.groupStage.endingGameDay')}}</h5>
        <select
          @change="onParamChanged('toMatchDay',$event.target.value)"
          v-model="endingGameDay"
          class="w-100"
          name="endingGameDay"
          id="endingGameDay"
        >
          <option
            :value="item"
            v-for="(item, index) in 3"
            :key="index"
            v-if="item>=startingGameDay"
          >{{'Match Day'+item}}</option>
        </select>
      </div>
      <div class="field mx-2 actions_field">
        <div class="flex align_center pointer">
          <fa :icon="fas.faRotateLeft" class="t-10 pointer text_Primary selectIcon" />
          <h5 class="ml-2 text_GreyText">{{$t('editions.groupStage.reset')}}</h5>
        </div>
        <div class="flex align_center pointer">
          <fa
            :icon="!live?fas.faToggleOff:fas.faToggleOn"
            class="t-10 pointer text_Primary selectIcon"
            :class="{text_Error:!live,text_Success:live}"
            @click="live=!live"
          />
          <h5 class="ml-2 text_GreyText">{{$t('editions.groupStage.live')}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["fas", "initials"],
  data() {
    return {
      live: false,
      homeAway: "H",
      startingDate: this.initials.fromDate,
      endingDate: this.initials.toDate,
      startingGameDay: 1,
      endingGameDay: 3
    };
  },
  methods: {
    onParamChanged(param, value) {
      this.$emit("filterChanged", { param: param, value: value });
    }
  }
};
</script>
<style lang="scss" scoped>
.field {
  input,
  select {
    border: $border;
    height: 2rem;
    border-radius: 5px;
    option {
      width: 100%;
    }
  }
}
@media (max-width: 975px) {
  .field_list {
    flex-wrap: wrap;
    flex-direction: column;
    .field {
      margin-top: 0.5rem;
      width: 100%;
      flex: 2;
    }
    .actions_field > .flex {
      padding: 0.5rem 1rem;
      justify-content: end;
    }
  }
}
</style>