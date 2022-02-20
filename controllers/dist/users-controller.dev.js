"use strict";

var usersLogic = require("../logic/users-logic");

var express = require("express");

var router = express.Router();

var jwt = require('jsonwebtoken'); // login operation
// POST http://localhost:3001/users/login


router.post("/login", function _callee(request, response, next) {
    var user, successfulLoginData;
    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    user = {
                        userName: request.body.userName,
                        password: request.body.password
                    };
                    _context.prev = 1;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(usersLogic.login(user));

                case 4:
                    successfulLoginData = _context.sent;
                    response.json(successfulLoginData);
                    _context.next = 12;
                    break;

                case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](1);
                    response.json(_context.t0);
                    console.log(_context.t0);

                case 12:
                    return _context.abrupt("return", successfulLoginData);

                case 13:
                case "end":
                    return _context.stop();
            }
        }
    }, null, null, [
        [1, 8]
    ]);
}); //Add new user to users table:
//POST http://localhost:3001/users/

router.post("/", function _callee2(requset, response) {
    var user, newUser;
    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    user = {
                        userId: 1,
                        userName: requset.body.userName,
                        password: requset.body.password,
                        userType: "admin"
                    };
                    console.log(user);
                    _context2.prev = 2;
                    _context2.next = 5;
                    return regeneratorRuntime.awrap(usersLogic.addUser(user));

                case 5:
                    newUser = _context2.sent;
                    response.json(newUser);
                    console.log(newUser);
                    _context2.next = 13;
                    break;

                case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2["catch"](2);
                    response.json(_context2.t0);

                case 13:
                    return _context2.abrupt("return", newUser);

                case 14:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, null, [
        [2, 10]
    ]);
}); //GET http://localhost:3001/users/:id
//Get one user from users table

router.get("/:id", function _callee3(request, response, next) {
    var id, user;
    return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    id = request.params.id;
                    _context3.prev = 1;
                    _context3.next = 4;
                    return regeneratorRuntime.awrap(usersLogic.getUserById(id));

                case 4:
                    user = _context3.sent;
                    response.json(user);
                    _context3.next = 11;
                    break;

                case 8:
                    _context3.prev = 8;
                    _context3.t0 = _context3["catch"](1);
                    return _context3.abrupt("return", next(_context3.t0));

                case 11:
                    return _context3.abrupt("return", user);

                case 12:
                case "end":
                    return _context3.stop();
            }
        }
    }, null, null, [
        [1, 8]
    ]);
}); //GET http://localhost:3001/users/
//Get all users from users table

router.get("/", function _callee4(request, response) {
    var id, allUsers;
    return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    id = request.params;
                    _context4.prev = 1;
                    _context4.next = 4;
                    return regeneratorRuntime.awrap(usersLogic.getAllUsers(id));

                case 4:
                    allUsers = _context4.sent;
                    console.log(allUsers);
                    response.json(allUsers);
                    _context4.next = 12;
                    break;

                case 9:
                    _context4.prev = 9;
                    _context4.t0 = _context4["catch"](1);
                    response.json(_context4.t0);

                case 12:
                    return _context4.abrupt("return", allUsers);

                case 13:
                case "end":
                    return _context4.stop();
            }
        }
    }, null, null, [
        [1, 9]
    ]);
}); //only by admin
//DELETE user from users table:

router["delete"]("/:id", function _callee5(requset, response) {
    var id, userToDelete;
    return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    id = requset.params.id;
                    _context5.prev = 1;
                    _context5.next = 4;
                    return regeneratorRuntime.awrap(usersLogic.deleteUser(id));

                case 4:
                    userToDelete = _context5.sent;
                    response.json(userToDelete);
                    console.log(userToDelete);
                    _context5.next = 12;
                    break;

                case 9:
                    _context5.prev = 9;
                    _context5.t0 = _context5["catch"](1);
                    response.json(_context5.t0);

                case 12:
                    return _context5.abrupt("return", userToDelete);

                case 13:
                case "end":
                    return _context5.stop();
            }
        }
    }, null, null, [
        [1, 9]
    ]);
}); //PUT update user details:

router.put("/:id", function _callee6(requset, response) {
    var user, update;
    return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    user = requset.body;
                    console.log(user);
                    _context6.prev = 2;
                    _context6.next = 5;
                    return regeneratorRuntime.awrap(usersLogic.updateUser(user));

                case 5:
                    update = _context6.sent;
                    response.json(update);
                    _context6.next = 12;
                    break;

                case 9:
                    _context6.prev = 9;
                    _context6.t0 = _context6["catch"](2);
                    response.json(_context6.t0);

                case 12:
                    return _context6.abrupt("return", update);

                case 13:
                case "end":
                    return _context6.stop();
            }
        }
    }, null, null, [
        [2, 9]
    ]);
});
module.exports = router;