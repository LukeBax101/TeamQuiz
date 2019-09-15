<template>
  <div>
    Results are in for question {{ questionNo }}
    {{ results }}
    <div v-if='questionStage === 2'>
      The correct answer is: {{ answer }}
    </div>
  </div>

</template>

<script>

export default {
  name: 'Results',
  data: function() {
    return {
    }
  },
  props: ['team'],
  computed: {
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    },
    results: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyResults:
                                  this.$store.getters.getCurrentSamResults;
    },
    questionStage: function() {
      return this.$store.getters.getQuestionStage;
    },
    answer: function() {
      return this.team === 'amy' ? this.$store.getters.getCurrentAmyAnswer:
                                  this.$store.getters.getCurrentSamAnswer;
    }

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
