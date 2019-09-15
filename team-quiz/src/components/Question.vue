<template>
  <div>
    <div>
      Question {{ questionNo }}
    </div>
    <div>
       {{ questionText }}
    </div>
    <button v-for='option in questionOptions' > {{option}}    </button>
  </div>

</template>

<script>
// import { ACTION_APP_INCREMENT, ACTION_APP_DECREMENT} from './../store/app.store'

export default {
  name: 'Quizer',
  data: function() {
    return {
    }
  },
  props: [
    'team'
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
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter {
  color: #42B983;
}
</style>
