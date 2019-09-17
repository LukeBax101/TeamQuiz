const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const appState = require('./dev/srv/index.js');

const port = process.env.PORT || 1337;

var server = express();
server.use('/', express.static(__dirname + '/dist'));
var app = server.listen(port);

appState(undefined, app);

console.log("Server running at http://localhost:%d", port);
