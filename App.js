const express = require("express");
const server = express();
const cors = require('cors');

const usersController = require('./controllers/users-controller');
const vacationsController = require('./controllers/vacations-controller');
const vacationsFollowController = require('./controllers/vacations-follow-controller');
const errorHandler = require('./error/error-handler');

server.use(express.json());
server.use(cors({ origin: "*" }));

server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/follow", vacationsFollowController);

server.use(express.static(__dirname));
server.use(errorHandler);
server.listen(3002, () => console.log("Listening on http://localhost:3002"));