<template>
  <div class="card bg_Alpha pa-2 my-4 flex column align_center">
    <div class="match_parts flex align_center center mb-2" v-if="match.timeline">
      <div
        class="part"
        v-for="(item, index) in 3"
        :key="index"
        :class="{filled_part:match.timeline[item-1]}"
      ></div>
    </div>
    <div class="match_details flex align_center space_between teams">
      <div class="flex align_center team1 team space_between">
        <h4>{{ match.team1_name }}</h4>
        <img
          :src="match.team1_icon||'http://olympia.phoinix.ai/pictures/nations/171.png'"
          @error="imageUrlAlt"
          width="32"
          height="32"
          :alt="match.team1_name"
        />
      </div>
      <div class="results flex align_center">
        <div class="score1 flex align_center mx-1">
          <div
            class="res flex align_center center mx-1"
            :class="{'bg_Success':match.qualified==1||match.result==1,'bg_Error':match.qualified!=1&&match.result!=1}"
          >
            <h4 class="text_White">{{match.qualified==1||match.result==1?'W':'L'}}</h4>
          </div>
          <h3>{{match.timeline?match.timeline[match.timeline.length-1].score1:match.score1}}</h3>
        </div>
        <h3>:</h3>
        <div class="score2 flex align_center mx-1">
          <h3>{{match.timeline?match.timeline[match.timeline.length-1].score2:match.score2}}</h3>
          <div
            :class="{'bg_Success':match.qualified==2||match.result==2,'bg_Error':match.qualified!=2&&match.result!=2}"
            class="res flex align_center center mx-1"
          >
            <h4 class="text_White">{{match.qualified==2||match.result==2?'W':'L'}}</h4>
          </div>
        </div>
      </div>
      <div class="flex align_center team2 team space_between">
        <img
          :src="match.team2_icon||'http://olympia.phoinix.ai/pictures/nations/171.png'"
          @error="imageUrlAlt"
          width="32"
          height="32"
          :alt="match.team2_name"
        />
        <h4>{{ match.team2_name }}</h4>
      </div>
    </div>
    <h3
      class="text_primary my-2"
    >{{match.timeline&&match.timeline[match.timeline.length-1][`title_${$i18n.locale}`]}}</h3>
    <div class="hr bg_Primary"></div>
    <div class="flex align_center space_between match_static_details">
      <!-- Date of the match -->
      <div class="flex column align_center my-1 mx-2">
        <fa :icon="fas.faCalendarDays" class="t-12 pointer text_GreyLight selectIcon" />

        <h4 class="my-1">{{dateFormatting(match.datetime)}}</h4>
      </div>
      <!-- Time of the match -->
      <div class="flex column align_center my-1 mx-2">
        <fa :icon="fas.faClock" class="t-12 pointer text_GreyLight selectIcon" />

        <h4 class="my-1">{{timeFormatting(match.datetime)}}</h4>
      </div>
      <!-- Stadium of the match -->
      <div class="flex column align_center my-1 mx-2">
        <img src="https://olympia.phoinix.ai/icos/stadium.png" alt="stdium" width="20" height="20" />
        <h4 class="my-1">{{match.stadium}}</h4>
      </div>
      <!-- Attendance of the match -->
      <div class="flex column align_center my-1 mx-2">
        <img
          src="https://olympia.phoinix.ai/icos/attendance.png"
          alt="stdium"
          width="20"
          height="20"
        />
        <h4 class="my-1">{{match.attendance}}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["match", "fas"],

  methods: {
    imageUrlAlt(event) {
      event.target.src = "http://olympia.phoinix.ai/pictures/nations/48.png";
    },
    dateFormatting(date) {
      //  Convert   DD-MM-YYYY to MM-DD-YYYY
      var dateParts = date.split("-");

      let d = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);

      return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    },
    timeFormatting(date) {
      //  Convert   DD-MM-YYYY to MM-DD-YYYY
      var dateParts = date.split("-");

      let d = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);
      return (
        d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes()
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.match_parts {
  flex-direction: row-reverse;
  .part {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: map-get($map: $colors, $key: GreyText);
    margin: 0 2px;
    &.filled_part {
      background: map-get($map: $colors, $key: Primary);
    }
  }
}
.match_static_details {
  width: 500px;
}
.hr {
  width: 100%;
  height: 2px;
}
.match_details {
  width: 500px;

  .team {
    width: 150px;
  }
  .results {
    .res {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  }
}
@media (max-width: 660px) {
  .match_static_details {
    width: 320px;
  }
  .match_details {
    width: 320px;
  }
  @media (max-width: 375px) {
    .match_static_details {
    width: 260px;
  }
  .match_details {
    width: 260px;
  }
    .team {
      flex-direction: column;
      &.team1{
        flex-direction: column-reverse;
      }
    }
  }
}
</style>