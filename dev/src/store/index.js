import Vue from 'vue'
import Vuex from 'vuex'
import socket from './socket'
import questions from './questions'
import results from './results'

Vue.use(Vuex)

const store = new Vuex.Store({
  debug: false,
  modules: {
    socket,
    questions,
    results
  }
})

export default store
