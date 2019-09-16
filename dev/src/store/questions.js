// define app store mutation names
const UPDATE_QUESTION_NO = 'updateQuestionNo';

// initial app state
const state = {
  questionNo: 1,
  amyQuestions: [
    {
      question: 'is this a question?',
      options: ['A','B','C','D'],
      correct: 0,
    },
    {
      question: 'is this me?',
      options: ['E','F','G','H'],
      correct: 1,
    },{
      question: 'is this you?',
      options: ['I','J','K','L'],
      correct: 2,
    }
  ],
  samQuestions: [
    {
      question: 'is this a sam question?',
      options: ['M','N','O','P'],
      correct: 3,
    },
    {
      question: 'is this sam?',
      options: ['Q','R','S','T'],
      correct: 1,
    },{
      question: 'is this?',
      options: ['U','V','W','X'],
      correct: 2,
    }
  ]
};

const getters = {
  getCurrentAmyQuestion (state) {
    return state.amyQuestions[state.questionNo-1];
  },
  getCurrentSamQuestion (state) {
    return state.samQuestions[state.questionNo-1];
  },
  getCurrentAmyAnswer (state) {
    return state.amyQuestions[state.questionNo-1].correct;
  },
  getCurrentSamAnswer (state) {
    return state.samQuestions[state.questionNo-1].correct;
  },
  getQuestionNo (state) {
    return state.questionNo;
  },
  getMaxQuestionNo (state) {
    return Math.min(state.amyQuestions.length, state.samQuestions.length);
  }
};

// app store actions
const actions = {
  socket_questionNoUpdate( context, questionNo) {
      context.commit(UPDATE_QUESTION_NO, questionNo);
  }
}

// app store mutations
const mutations = {
  [UPDATE_QUESTION_NO] (state, questionNo) {
    state.questionNo = questionNo;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
};
