<template>
  <div>
    <div v-if='!verified'>
      Enter password:
      <input type='password' v-model='password'>
      </input>
    </div>
    <div v-else>
      <div>
        Server status:
        <div>{{ open ? 'Open' : 'Closed' }}</div>
        <div v-if='questionNo !== 0'>
          <div> On question {{ questionNo }}</div>
          <div>{{ questionStage === 0 ? 'Showing Question' : ( questionStage === 1 ? 'Question finished' : 'Showing answers') }}</div>
          <div> {{ ended ? 'On Final Results!' : 'Not finished' }}</div>
        </div>
        <div v-else>
          Quiz not started
        </div>
      </div>
      <div>

        <button type='button' @click='toggleServer()'> {{ toggleText }}</button>
        <button type='button' v-if='!ended' @click='nextStage()'> {{ nextStageText }}</button>
        <button v-if='questionNo !== 0' type='button' @click='resetServer()'> Reset Quiz </button>
      </div>
      <div v-if='questionNo !== 0'>
        <Score></Score>
        <div>
          Current Amy Question:
          <Question v-bind:team='amy' v-bind:active='false'></Question>
          Current Sam Question:
          <Question v-bind:team='sam' v-bind:active='false'></Question>
        </div>
        <div>
          Current Amy Results:
          <Results v-bind:team='amy'></Results>
          Current Sam Results:
          <Results v-bind:team='sam'></Results>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Results from './Results.vue'
import Question from './Question.vue'
import Score from './Score.vue'

export default {
  name: 'Controller',
  computed: {
    verified: function() {
      return this.password === 'test';
    },
    nextStageText: function() {
      if (this.questionNo === 0) {
        return 'Start Quiz';
      }
      if (this.questionStage === 0) {
        return `Send time warning for question ${this.questionNo}`;
      } else if (this.questionStage === 1) {
        return `Show answers for question ${this.questionNo}`;
      }
      return `Move onto question ${this.questionNo + 1}`;
    },
    open: function() {
      return this.$store.getters.getOpen;
    },
    toggleText: function() {
      return this.open ? 'Close Server' : 'Open Server';
    },
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    },
    questionStage: function() {
      return this.$store.getters.getQuestionStage;
    },
    ended: function() {
      return this.$store.getters.getMaxQuestionNo == this.questionNo && this.questionStage === 2;
    },
    amyScore: function() {
      return this.$store.getters.getAmyScore;
    },
    samScore: function() {
      return this.$store.getters.getSamScore;
    },
    amyAnswer: function() {
      return this.$store.getters.getCurrentAmyAnswer;
    },
    amyVotes: function() {
      return this.$store.getters.getCurrentAmyResults;
    },
    samAnswer: function() {
      return this.$store.getters.getCurrentSamAnswer;
    },
    samVotes: function() {
      return this.$store.getters.getCurrentSamResults;
    }
  },
  data: function() {
    return {
      verfied: false,
      password: '',
      amy: 'amy',
      sam: 'samuel',
    }
  },
  components: {
    Question,
    Results,
    Score
  },
  methods: {
    toggleServer: function() {
      this.$socket.client.emit('open_update', !this.open);
    },
    resetServer: function() {
      this.$socket.client.emit('question_no_update',  0);
      this.$socket.client.emit('question_stage_update', 0);
      this.$socket.client.emit('reset_vote');
      this.$socket.client.emit('reset_score');

    },
    nextStage: function() {
      if (this.questionNo === 0) {
        this.$socket.client.emit('question_no_update', 1);
        this.$socket.client.emit('question_stage_update', 0);
      } else {
        if (this.questionStage === 0) {
          this.startQuestionWarning();

        } else if (this.questionStage === 1) {
            this.$socket.client.emit('question_stage_update', 2);
            setTimeout(this.calculateScores(), 3000);
        } else {
          this.$socket.client.emit('question_no_update', this.questionNo + 1);
          this.$socket.client.emit('question_stage_update', 0);
          this.$socket.client.emit('reset_vote');
        }
      }
    },
    startQuestionWarning: function() {
      let timeLeft = 5;
      this.$socket.client.emit('question_end_warning', timeLeft);
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          this.$socket.client.emit('question_end_warning', timeLeft);
        } else {
          this.$socket.client.emit('question_end_warning', -1);
          this.$socket.client.emit('question_stage_update', 1);
          clearInterval(timer);
        }
      }, 1000);
    },
    calculateScores: function() {
      const amyPoint = this.amyVotes.filter((val, idx) => idx !== this.amyAnswer).some((val, idx) => val >= this.amyVotes[this.amyAnswer]);
      const amy = amyPoint ? this.amyScore: this.amyScore + 1;

      const samPoint = this.samVotes.filter((val, idx) => idx !== this.samAnswer).some((val, idx) => val >= this.samVotes[this.samAnswer]);
      const sam = samPoint ? this.samScore: this.samScore + 1;
      this.$socket.client.emit('score_update', {amy, sam});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
