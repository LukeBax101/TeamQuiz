<template>
  <div v-if='questionNo === 0'>
    waiting for quiz to start
  </div>
  <div v-else>
    <div>
      Question {{ questionNo }}
    </div>
    <div>
       {{ questionText }}
    </div>
    <button v-for='(option, idx) in questionOptions' v-bind:class="{ current: currentChoice === idx }"  @click='selectOption(idx)'> {{option}}    </button>

    <div v-if='timeLeft > 0'>
      {{currentChoice === -1 ? `Warning! Choose in ${timeLeft } seconds!` : `${timeLeft} seconds left`}}
    </div>
  </div>
</template>

<script>
// import { ACTION_APP_INCREMENT, ACTION_APP_DECREMENT} from './../store/app.store'

export default {
  name: 'Quizer',
  data: function() {
    return {
      currentChoice: -1,
    }
  },
  props: [
    'team',
    'active'
  ],
  computed: {
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    },
    questionText: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyQuestion.question :
      this.$store.getters.getCurrentSamQuestion.question;
    },
    questionOptions: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyQuestion.options:
      this.$store.getters.getCurrentSamQuestion.options;
    },
    timeLeft: function() {
      return this.$store.getters.getTimeLeft;
    }
  },
  methods: {
    selectOption: function(idx) {
      if (this.active && idx !== this.currentChoice) {
        if (this.currentChoice !== -1) {
          this.$socket.client.emit('change_vote', { team: this.team, choice: idx, prev: this.currentChoice } );
        } else {
          this.$socket.client.emit('change_vote', { team: this.team, choice: idx} );
        }
        this.currentChoice = idx;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.current {
  background: green;
}
</style>
