<template>
  <div v-if='questionNo === 0'>
    waiting for quiz to start
  </div>
  <div v-else>
    <div v-if='timeLeft > 0'>
      <b-alert show dismissible> {{auto ? `Warning, random option chosen! Choose for yourself in ${timeLeft}second${timeLeft > 1 ? 's': ''}!` : `${timeLeft}second${timeLeft > 1 ? 's': ''}left!`}}
      </b-alert>
    </div>
    <div>
      Question {{ questionNo }}
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
        v-bind:class='{
          team: currentTeamChoice === idx,
          player: currentChoice === idx,
          answer: (questionStage === 2 && answer === idx)
        }'
        :key='idx'>
       <span class='progress' v-bind:style="{width: widths[idx]+'%'}">
       </span>
     </b-button>
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
    'active',
    'locked'
  ],
  computed: {
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    },
    questionText: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyQuestion.question :
      this.$store.getters.getCurrentSamQuestion.question;
    },
    questionStage: function() {
      return this.$store.getters.getQuestionStage;
    },
    questionOptions: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyQuestion.options :
      this.$store.getters.getCurrentSamQuestion.options;
    },
    timeLeft: function() {
      return this.$store.getters.getTimeLeft;
    },
    answer: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyAnswer:
                                  this.$store.getters.getCurrentSamAnswer;
    },
    samVotes: function() {
      return this.$store.getters.getCurrentSamResults;
    },
    amyVotes: function() {
      return this.$store.getters.getCurrentAmyResults;
    },
    tieBreak: function() {
      return this.$store.getters.getTieBreak;
    },
    currentTeamAmyChoice: function() {
      let i = Math.max(...this.amyVotes);
      if (i === 0) return -1;
      for (let j = 0; j < 3; j++ ) {
        if (this.amyVotes[this.tieBreak[j]] === i) {
          return this.tieBreak[j];
        }
      }
      return -1;
    },
    currentTeamSamChoice: function() {
      let i = Math.max(...this.samVotes);
      if (i === 0)  return -1;
      for (let j = 0; j < 3; j++ ) {
        if (this.samVotes[this.tieBreak[j]] === i) {
          return this.tieBreak[j];
        }
      }
      return -1;
    },
    currentTeamChoice: function() {
      return this.team === 'amy' ? this.currentTeamAmyChoice:
                                   this.currentTeamSamChoice;
    },
    widths: function() {
      return this.team === 'amy' ? this.amyWidths:
                                  this.samWidths;
    },
    amyWidths: function() {
      const sum = this.amyVotes.reduce((val, acc) => {return val + acc;}, 0);
      return this.amyVotes.map((val) => ((val/sum) * 100));
    },
    samWidths: function() {
      const sum = this.samVotes.reduce((val, acc) => {val + acc}, 0);
      return this.samVotes.map((val) => ((val/sum) * 100));
    }
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

.player {
  color: #fff !important;
  background-color: #17a2b8;
  border-color: #17a2b8;
  text-decoration: none;
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
  outline: 0;
}

.team {
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5) !important;
}

.answer {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
  text-decoration: none;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
  outline: 0;
}

.team.answer {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  text-decoration: none;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
  outline: 0;
}

.optionContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.option{
    height: 50px;
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
