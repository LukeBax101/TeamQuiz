import Vue from 'vue'
import Vuex from 'vuex'
import socket from './socket'
import questions from './questions'

Vue.use(Vuex)

const store = new Vuex.Store({
  debug: false,
  modules: {
    socket,
    questions
  }
})

export default store
