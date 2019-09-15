// define app store mutation names
const UPDATE_VOTES = 'updateVotes';

// initial app state
const state = {
  amyResults: [0,0,0,0],
  samResults: [0,0,0,0]
};

const getters = {
  getCurrentAmyResults (state) {
    return state.amyResults;
  },
  getCurrentSamResults (state) {
    return state.samResults;
  }
};

// app store actions
const actions = {
  socket_voteUpdate( context, votes) {
      context.commit(UPDATE_VOTES, votes);
  }
}

// app store mutations
const mutations = {
  [UPDATE_VOTES] (state, {amyVotes, samVotes}) {
    state.amyResults = amyVotes;
    state.samResults = samVotes;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
};
