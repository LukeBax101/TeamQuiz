<template>
  <div>
    <div v-if='!open'>
      Waiting...
    </div>
    <div v-else>
      <div v-if='teamSelected'>
        Choose the person who's team you'd like to be on:
        <button type='button' @click='chooseTeamSamuel()'> Team Samuel</button>
        <button type='button' @click='chooseTeamAmy()'> Team Amy</button>
        <div>
          If you really can't decide then click here to pick randomly:
          <button type='button' @click='chooseRandomTeam()'> Random </button>
        </div>
      </div>
      <div v-else>
        <Score> </Score>
        You're on team: {{ team }}
        <Question v-bind:team='team' v-bind:active='true'>
        </Question>
        <Results v-bind:team='team' v-if='questionNo !== 0'>
        </Results>
      </div>
    </div>
  </div>

</template>

<script>
import Question from './Question.vue'
import Results from './Results.vue'
import Score from './Score.vue'


export default {
  name: 'Quizer',
  data: function() {
    return {
      team: '',
    }
  },
  computed: {
    teamSelected: function() {
      return this.team !== 'samuel' && this.team !== 'amy';
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
    Results,
    Score
  },
  methods: {
    chooseTeamSamuel: function() {
      this.team = 'samuel';
    },
    chooseTeamAmy: function() {
      this.team = 'amy';
    },
    chooseRandomTeam: function() {
      this.team = Math.random() > 0.5 ? 'Samuel' : 'Amy';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
