import express from 'express';
import socketIO from "socket.io";

export default (app, http) => {
  // app.use(express.json());
  //
  // app.get('/foo', (req, res) => {
  //   res.json({msg: 'foo'});
  // });
  //
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  //
  let open = false;
  let inQuestion = true;
  let questionNo = 1;

  let io = socketIO(http);
  io.on("connection", client => {
    client.on("open_update", function(data) {
      console.log('updating open to:');
      console.log(data);
      open = data;
      io.emit("open_update", data);
    });
    client.on("in_question_update", function(data) {
      console.log('updating inQuestion to:');
      console.log(data);
      inQuestion = data;
      io.emit("in_question_update", data);
    });
    client.on("question_no_update", function(data) {
      console.log('updating question no to:');
      console.log(data);
      questionNo = data;
      io.emit("question_no_update", data);
    });
    client.emit("open_update", open);
    client.emit("in_question_update", inQuestion);
    client.emit("question_no_update", questionNo);
  });
}
