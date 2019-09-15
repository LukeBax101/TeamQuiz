<template>
  <div>
    <div v-if='!open'>
      Waiting...
    </div>
    <div v-else>
      <div v-if='teamSelected'>
        Choose the person you are closet to:
        <button type='button' @click='chooseTeamSamuel()'> Team Samuel</button>
        <button type='button' @click='chooseTeamAmy()'> Team Amy</button>
        <div>
          If you really can't decide then click here to pick randomly:
          <button type='button' @click='chooseRandomTeam()'> Random </button>
        </div>
      </div>
      <div v-else>
        You're on team: {{ team }}
        <Question v-if='inQuestion' v-bind:team='team'>
        </Question>
        <Results v-if='!inQuestion'>
        </Results>
      </div>
    </div>
  </div>

</template>

<script>
// import { ACTION_APP_INCREMENT, ACTION_APP_DECREMENT} from './../store/app.store'
import Question from './Question.vue'
import Results from './Results.vue'


export default {
  name: 'Quizer',
  data: function() {
    return {
      team: '',
      password: '',
    }
  },
  computed: {
    teamSelected: function() {
      return this.team !== 'samuel' && this.team !== 'amy';
    },
    open: function() {
      return this.$store.getters.getOpen;
    },
    inQuestion: function() {
      return this.$store.getters.getInQuestion;
    }

  },
  components: {
    Question,
    Results
  },
  methods: {
    chooseTeamSamuel: function() {
      this.team = 'samuel';
      // this.$socket.client.emit('vote', this.appCounter + 1);
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
