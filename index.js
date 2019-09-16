const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 1337;

var server = express();
server.use('/', express.static(__dirname + '/dist'));
var app = server.listen(port);

let open = false;
let timeLeft = -1;
let questionStage = 0;
let questionNo = 0;
let amyVotes = [0,0,0,0];
let samVotes = [0,0,0,0];
let amyScore = 0;
let samScore = 0;


let io = socketIO.listen(app, {
  transports: ['websocket']
});

io.on("connection", client => {
  client.on("open_update", function(data) {
    open = data;
    io.emit("open_update", data);
  });
  client.on("question_stage_update", function(data) {
    questionStage = data;
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
});

console.log("Server running at http://localhost:%d", port);
