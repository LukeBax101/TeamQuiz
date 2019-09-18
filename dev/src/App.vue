<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <p>
    <router-link to="/quizer">Go to Quizer</router-link>
      <router-link to="/controller">Go to Controller</router-link>
    </p> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Quizer from './components/Quizer.vue'
import Controller from './components/Controller.vue'

export default {
  name: 'app',
  components: {
    Quizer,
    Controller
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
