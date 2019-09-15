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
        <div>On question {{ questionNo }}</div>
        <div>{{ inQuestion ? 'Showing Question' : 'Showing Results' }}</div>
        <div> {{ ended ? 'On Final Results!' : 'Not finished' }}</div>
      </div>
      <div>

        <button type='button' @click='toggleServer()'> {{ toggleText }}</button>
        <button type='button' v-if='!ended' @click='nextStage()'> {{ nextStageText }}</button>
        <button type='button' @click='resetServer()'> Reset to Question 1 </button>
      </div>
      <div>
        Current Amy Question:
        <Question v-bind:team='amy'></Question>
        Current Sam Question:
        <Question v-bind:team='sam'></Question>
      </div>
      <div>
        Current Results:
        <Results></Results>
      </div>

    </div>
  </div>

</template>

<script>
import Results from './Results.vue'
import Question from './Question.vue'

export default {
  name: 'Controller',
  computed: {
    verified: function() {
      return this.password === 'test';
    },
    nextStageText: function() {
      return this.$store.getters.getInQuestion ? `Show results for question ${this.$store.getters.getQuestionNo}` :
                                                `Move onto question ${this.$store.getters.getQuestionNo + 1}`
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
    inQuestion: function() {
      return this.$store.getters.getInQuestion;
    },
    ended: function() {
      return this.$store.getters.getMaxQuestionNo == this.questionNo && !this.inQuestion;
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
    Results
  },
  methods: {
    toggleServer: function() {
      this.$socket.client.emit('open_update', !this.$store.getters.getOpen);
    },
    resetServer: function() {
      this.$socket.client.emit('question_no_update',  1);
      this.$socket.client.emit('in_question_update', true);
    },
    nextStage: function() {
      if (this.$store.getters.getInQuestion) {
        this.$socket.client.emit('in_question_update', false);
      } else {
        this.$socket.client.emit('question_no_update', this.$store.getters.getQuestionNo + 1);
        this.$socket.client.emit('in_question_update', true);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
