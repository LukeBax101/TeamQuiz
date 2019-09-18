<template>
  <div class='score-bar'>
    <div class='amy-score'>
    Amy: {{ amyScore }}
  </div>
  <div class='sam-score'>
    Sam: {{ samScore }}
  </div>
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
.score-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.amy-score {
  float: left;
}

.sam-score {
  margin-left: auto;
}
</style>
