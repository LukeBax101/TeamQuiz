<template>
  <div v-if='questionNo === 0'>
    waiting for quiz to start
  </div>
  <div v-else>
    <div v-if='timeLeft > 0'>
      <b-alert show dismissible> {{auto ? `Warning, random option chosen! Choose for yourself in ${timeLeft} second${timeLeft > 1 ? 's': ''}!` : `${timeLeft} second${timeLeft > 1 ? 's': ''} left!`}}
      </b-alert>
    </div>
    <div>
      <strong> Question {{ questionNo }} </strong>
    </div>
    <div>
       {{ questionText }}
    </div>
    <div class='optionContainer'>
      <b-button
        block
        pill
        variant="outline-info"
        v-for='(option, idx) in questionOptions'
        :disabled='questionStage !== 0 && currentChoice !== idx'
        v-bind:question='option'
        class = 'option'
        @click='selectOption(idx)'
        v-bind:class="{
          'player-choice': currentChoice === idx,
          'answer-correct': (questionStage === 2 && answer === idx),
          'answer-incorrect': (questionStage === 2 && (currentTeamChoice === idx || currentTeamChoice === -1) && currentTeamChoice !== answer)
        }"
        :key='idx'>
       <span class='progress' v-bind:style="{width: widths[idx]+'%'}">
       </span>
       <span v-if='currentTeamChoice === idx' class='team-choice'></span>
     </b-button>
    </div>
  </div>
</template>
<!-- team: currentTeamChoice === idx, -->
<script>
import Team from '../teamType.js';
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
    'active',
    'locked'
  ],
  computed: {
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    },
    questionText: function() {
      return this.team === Team.AMY ? this.$store.getters.getCurrentAmyQuestion.question :
                                      this.$store.getters.getCurrentSamQuestion.question;
    },
    questionStage: function() {
      return this.$store.getters.getQuestionStage;
    },
    questionOptions: function() {
      return this.team === Team.AMY ? this.$store.getters.getCurrentAmyQuestion.options :
                                      this.$store.getters.getCurrentSamQuestion.options;
    },
    timeLeft: function() {
      return this.$store.getters.getTimeLeft;
    },
    answer: function() {
      return this.team === Team.AMY ? this.$store.getters.getCurrentAmyAnswer:
                                      this.$store.getters.getCurrentSamAnswer;
    },
    votes: function() {
      return this.team === Team.AMY ? this.$store.getters.getCurrentAmyResults:
                                      this.$store.getters.getCurrentSamResults;
    },
    tieBreak: function() {
      return this.$store.getters.getTieBreak;
    },
    currentTeamChoice: function() {
      let i = Math.max(...this.votes);
      if (i === 0)  return -1;
      for (let j = 0; j < 4; j++ ) {
        if (this.votes[this.tieBreak[j]] === i) {
          return this.tieBreak[j];
        }
      }
      return -1;
    },
    widths: function() {
      const sum = this.votes.reduce((val, acc) => {return val + acc;}, 0);
      return this.votes.map((val) => val === 0 ? 0: ((val/sum) * 100));
    },
  },
  watch: {
    timeLeft: function(newVal) {
      if (newVal === 5 && this.currentChoice == -1) {
        const idx = Math.floor(Math.random() * 4);
        this.selectOption(idx);
        this.auto = true;
      }
    },
    questionNo: function() {
      this.currentChoice = -1;
    },
    questionStage: function(newVal) {
      if (newVal == 2) this.currentChoice = -1;
    }
  },
  methods: {
    selectOption: function(idx) {
      if (this.active && idx !== this.currentChoice) {
        this.auto = false;
        if (this.currentChoice !== -1) {
          this.$socket.client.emit('change_vote', { team: this.team, choice: idx, prev: this.currentChoice });
        } else {
          this.$socket.client.emit('change_vote', { team: this.team, choice: idx});
        }
        this.currentChoice = idx;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.player-choice {
  color: #fff !important;
  background-color: #17a2b8;
  border-color: #17a2b8;
  text-decoration: none;
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
  outline: 0;
}

.answer-incorrect {
  color: #fff;
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  text-decoration: none;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5) !important;
  outline: 0;
}

.answer-correct {
  color: #000 !important;
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  text-decoration: none;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5) !important;
  outline: 0;
}

.team-choice {
  background-color: gold;
  position: absolute;
    right: 10%;
    width: 24px;
    height: 24px;
    mask-image: url("../../public/icons-crown.png");
    -webkit-mask-image: url("../../public/icons-crown.png");
    animation: rock 0.75s ease-in-out infinite;
    -webkit-animation: rock 0.75s ease-in-out infinite;
}

@keyframes rock {
  0% { transform: rotate(15deg); }
  50% { transform: rotate(-15deg); }
  100% { transform: rotate(15deg); }
}
@webkit-keyframes rock {
  0% { webkit-transform: rotate(15deg); }
  50% { -webkit-transform: rotate(-15deg); }
  100% { -webkit-transform: rotate(15deg); }
}

.optionContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.option{
    height: 50px;
    width: 95%;
    left: 2.5%;
    overflow: hidden;
    position:relative;
}

.option:after{
    content:attr(question);
}

.option .progress{
    background-color: rgba(0, 0, 0, 0.3);
    height:100%;
    border-radius:50rem;
    bottom:0;
    left:0;
    position:absolute;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    transition: width 0.5s;
}
</style>
