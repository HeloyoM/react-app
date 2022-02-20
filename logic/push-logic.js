const express = require("express");
const expressServer = express();
const http = require("http"); // More basic server than express.
const socketIO = require("socket.io");
const httpServer = http.createServer(expressServer);
const socketServer = socketIO.listen(httpServer);

expressServer.use(express.static(__dirname));
let userIdToSocketsMap = new Map();

// 2. Server got the client connection, and add its Socket to a Socket collection:
socketServer.sockets.on("connection", socket => {
    console.log("Connection request");
    var handshakeData = socket.request;
    let id = handshakeData._query['userId'];

    console.log("User id: " + id);
    userIdToSocketsMap.set(id, socket);

    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);

    // 4. Server got a message from one client: 
    socket.on("msg-from-client", msg => {
        console.log("Client sent message: " + JSON.stringify(msg));

        let senderId = msg.senderId;
        let targetId = msg.targetId;
        let parameters = msg.parameters;

        let socket = userIdToSocketsMap.get(targetId);

        // 5. Server sending this message to all clients: 
        socket.emit("msg-from-server", parameters);
    });

    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        var handshakeData = socket.request;
        let userId = handshakeData._query['userId'];

        // A valid userId means the user clicked "logout"
        userIdToSocketsMap.delete(userId);
        console.log(userId + " client has been disconnected. Total clients: " + userIdToSocketsMap.size);
    });

});

function boradcastExceptSender(action, data, senderId) {
    for (let [id, socket] of userIdToSocketsMap) {
        if (id != senderId) {
            socket.emit(action, data);
        }
    }
}

module.exports = {
    boradcastExceptSender
}
httpServer.listen(5000, () => console.log("Listening..."));

// Note: When using React, change that port to 3001