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
    <div class='optionContainer'>
      <button class='option' v-for='(option, idx) in questionOptions' v-bind:class="{ current: currentChoice === idx }"  @click='selectOption(idx)'> {{option}}    </button>
    </div>
    <div v-if='timeLeft > 0'>
      {{auto ? `Warning, random option chosen! Choose for yourself in ${timeLeft} second${timeLeft > 1 ? 's': ''}!` : `${timeLeft} second${timeLeft > 1 ? 's': ''} left!`}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data: function() {
    return {
      currentChoice: -1,
      auto: false,
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
  watch: {
    timeLeft: function(newVal, oldVal) {
      if (newVal === 5 && this.currentChoice == -1) {
        this.selectOption(Math.floor(Math.random() * 4));
        this.auto = true;
      }
    },
    questionNo: function(newVal, oldVal) {
      this.currentChoice = -1;
    }
  },
  methods: {
    selectOption: function(idx) {
      if (this.active && idx !== this.currentChoice) {
        this.auto = false;
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

.option {
  height: 70px;
}

.optionContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
}
</style>
