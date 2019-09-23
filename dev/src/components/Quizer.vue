<template>
  <div>
    <div v-if='!open'>
      Waiting...
    </div>
    <div v-else>
      <div v-if='teamSelected'>
        Choose the person who's team you'd like to be on:
        <button type='button' @click='chooseTeamSamuel()'> Team {{sam}}</button>
        <button type='button' @click='chooseTeamAmy()'> Team {{amy}}</button>
        <div>
          If you really can't decide then click here to pick randomly:
          <button type='button' @click='chooseRandomTeam()'> Random </button>
        </div>
      </div>
      <div v-else>
        <Score v-bind:team='team'> </Score>
        <Question v-bind:team='team' v-bind:active='true'>
        </Question>
        <!-- <Results v-bind:team='team' v-if='questionNo !== 0'>
        </Results> -->
      </div>
    </div>
  </div>

</template>

<script>
import Question from './Question.vue'
// import Results from './Results.vue'
import Score from './Score.vue'
import Team from '../teamType.js';



export default {
  name: 'Quizer',
  data: function() {
    return {
      team: '',
      amy: Team.AMY,
      sam: Team.SAM,
    }
  },
  computed: {
    teamSelected: function() {
      return this.team !== this.sam && this.team !== this.amy;
    },
    open: function() {
      return this.$store.getters.getOpen;
    },
    questionStage: function() {
      return this.$store.getters.getQuestionStage;
    },
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    },

  },
  components: {
    Question,
    // Results,
    Score
  },
  methods: {
    chooseTeamSamuel: function() {
      this.team = Team.SAM;
    },
    chooseTeamAmy: function() {
      this.team = Team.AMY;
    },
    chooseRandomTeam: function() {
      this.team = Math.random() > 0.5 ? Team.SAM : Team.AMY;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
