const express = require('express');
const socketIO = require('socket.io');



module.exports = (app, http) =>  {
  function shuffleTieBreak() {
    let array = [0,1,2,3];
    for (let i = 3 - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let open = false;
  let timeLeft = -1;
  let questionStage = 0;
  let questionNo = 0;
  let amyVotes = [0,0,0,0];
  let samVotes = [0,0,0,0];
  let amyScore = 0;
  let samScore = 0;
  let tieBreak = [0,1,2,3];

  let io = socketIO.listen(http, {
    transports: ['websocket']
  });
  io.on("connection", client => {
    client.on("open_update", function(data) {
      open = data;
      io.emit("open_update", data);
    });
    client.on("question_stage_update", function(data) {
      questionStage = data;
      if (data === 0) {
        tieBreak = shuffleTieBreak();
        io.emit("tie_break_update", tieBreak);
      }
      io.emit("question_stage_update", data);
    });
    client.on("question_no_update", function(data) {
      questionNo = data;
      io.emit("question_no_update", data);
    });
    client.on("reset_vote", function() {
      amyVotes = [0,0,0,0];
      samVotes = [0,0,0,0];
      io.emit("vote_update", {amyVotes, samVotes});
    });
    client.on("score_update", function({amy, sam}) {
      amyScore = amy;
      samScore = sam;
      io.emit("score_update", {amyScore, samScore});
    });
    client.on("reset_score", function() {
      amyScore = 0;
      samScore = 0;
      io.emit("score_update", {amyScore, samScore});
    });
    client.on("change_vote", function({team, choice, prev}) {
      if (team === 'amy') {
        amyVotes[choice]++;
        if (prev >= 0) amyVotes[prev]--;
      } else {
        samVotes[choice]++;
        if (prev >= 0) samVotes[prev]--;
      }
      io.emit("vote_update", {amyVotes, samVotes});
    });
    client.on("question_end_warning", function(time) {
      timeLeft = time;
      io.emit("question_end_warning", time);
    });
    client.emit("open_update", open);
    client.emit("question_stage_update", questionStage);
    client.emit("question_no_update", questionNo);
    client.emit("vote_update", {amyVotes, samVotes});
    client.emit("question_end_warning", timeLeft);
    client.emit("score_update", {amyScore, samScore});
    client.emit("tie_break_update", tieBreak);
  });
}
