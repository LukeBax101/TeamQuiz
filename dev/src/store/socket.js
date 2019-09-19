
const UPDATE_OPEN = 'updateOpen';
const UPDATE_QUESTION_STAGE = 'updateQuestionStage';
const UPDATE_TIME_LEFT = 'updateTimeLeft';
const UPDATE_AMY_SCORE = 'updateAmyScore';
const UPDATE_SAM_SCORE = 'updateSamScore';
const UPDATE_TIE_BREAK = 'updateTieBreak';
// const SOCKET_HELLO_WORLD = 'SOCKET_helloWorld';

// initial app state
const state = {
  open: false,
  questionStage: 0,
  timeLeft: -1,
  amyScore: 0,
  samScore: 0,
  tieBreak: [0,1,2,3],
};

const getters = {
  getCounter (state) {
    return state.counter;
  },
  getOpen (state) {
    return state.open;
  },
  getQuestionStage (state) {
    return state.questionStage;
  },
  getTimeLeft (state) {
    return state.timeLeft;
  },
  getAmyScore (state) {
    return state.amyScore;
  },
  getSamScore (state) {
    return state.samScore;
  },
  getTieBreak (state) {
    return state.tieBreak;
  }
};

// app store actions
const actions = {
  socket_openUpdate( context , open) {
    context.commit(UPDATE_OPEN, open);
  },
  socket_questionStageUpdate( context, questionStage) {
    context.commit(UPDATE_QUESTION_STAGE, questionStage);
  },
  socket_questionEndWarning( context, time) {
    context.commit(UPDATE_TIME_LEFT, time);
  },
  socket_scoreUpdate( context , {amyScore, samScore }) {
    context.commit(UPDATE_AMY_SCORE, amyScore);
    context.commit(UPDATE_SAM_SCORE, samScore);
  },
  socket_tieBreakUpdate( context , tieBreak) {
    context.commit(UPDATE_TIE_BREAK, tieBreak);
  },
}

// app store mutations
const mutations = {
  [UPDATE_OPEN] (state, open) {
      state.open = open;
  },
  [UPDATE_QUESTION_STAGE] (state, questionStage) {
    state.questionStage = questionStage;
  },
  [UPDATE_TIME_LEFT] (state, time) {
    state.timeLeft = time;
  },
  [UPDATE_AMY_SCORE] (state, score) {
    state.amyScore = score;
  },
  [UPDATE_SAM_SCORE] (state, score) {
    state.samScore = score;
  },
  [UPDATE_TIE_BREAK] (state, tieBreak) {
    state.tieBreak = tieBreak;
  },
}

export default {
  state,
  actions,
  mutations,
  getters
};
