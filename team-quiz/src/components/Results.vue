<template>
  <div>
    Results are in for question {{ questionNo }}
  </div>

</template>

<script>
// import { ACTION_APP_INCREMENT, ACTION_APP_DECREMENT} from './../store/app.store'

export default {
  name: 'Results',
  data: function() {
    return {
    }
  },
  computed: {
    questionNo: function() {
      return this.$store.getters.getQuestionNo;
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
