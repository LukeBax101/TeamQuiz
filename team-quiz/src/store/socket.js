
const UPDATE_OPEN = 'updateOpen';
const UPDATE_IN_QUESTION= 'updateInQuestion';
// const SOCKET_HELLO_WORLD = 'SOCKET_helloWorld';

// initial app state
const state = {
  open: false,
  inQuestion: true,
};

const getters = {
  getCounter (state) {
    return state.counter;
  },
  getOpen (state) {
    return state.open;
  },
  getInQuestion (state) {
    return state.inQuestion;
  }
};

// app store actions
const actions = {
  socket_openUpdate( context , open) {
      context.commit(UPDATE_OPEN, open);
  },
  socket_inQuestionUpdate( context, inQuestion) {
      context.commit(UPDATE_IN_QUESTION, inQuestion);
  }
}

// app store mutations
const mutations = {
  [UPDATE_OPEN] (state, open) {
      state.open = open;
  },
  [UPDATE_IN_QUESTION] (state, inQuestion) {
    state.inQuestion = inQuestion;
  },
}

export default {
  state,
  actions,
  mutations,
  getters
};
