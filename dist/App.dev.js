"use strict";

var express = require("express");

var server = express();

var cors = require('cors');

var usersController = require('./controllers/users-controller');

var vacationsController = require('./controllers/vacations-controller');

var vacationsFollowController = require('./controllers/vacations-follow-controller');

var errorHandler = require('./error/error-handler');

server.use(express.json());
server.use(cors({
  origin: "*"
}));
server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/follow", vacationsFollowController);
server.use(express["static"](__dirname));
server.use(errorHandler);
server.listen(3001, function () {
  return console.log("Listening on http://localhost:3001");
});