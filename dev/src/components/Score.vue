<template>
  <div>
    Amy: {{ amyScore }}
    Sam: {{ samScore }}
  </div>

</template>

<script>

export default {
  name: 'Score',
  data: function() {
    return {
    }
  },
  props: ['team'],
  computed: {
    amyScore: function() {
      return this.$store.getters.getAmyScore;
    },
    samScore: function() {
      return this.$store.getters.getSamScore;
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
