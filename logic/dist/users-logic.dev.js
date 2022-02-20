"use strict";

var usersDao = require("../dao/users-dao");

var jwt = require('jsonwebtoken');

var ErrorType = require('../error/error-type');

var ServerError = require('../error/server-error');

var connection = require('../dao/connection-wrapper');

var bcryptjs = require('bcryptjs');

var config = require('../config.json');

function login(user) {
    var findUser, hashedPassword, token;
    return regeneratorRuntime.async(function login$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (user.userName !== "admin") {
                        user.userType = "costumer";
                    } else {
                        user.userType = "admin";
                    }

                    ;
                    validateUserData(user);
                    _context.next = 5;
                    return regeneratorRuntime.awrap(connection.executeWithParameters("SELECT * FROM users WHERE userName=?", [user.userName]));

                case 5:
                    findUser = _context.sent;

                    if (findUser.length) {
                        _context.next = 10;
                        break;
                    }

                    throw new ServerError(ErrorType.INVALID_USER_NAME.message);

                case 10:
                    hashedPassword = findUser[0].password;
                    _context.next = 13;
                    return regeneratorRuntime.awrap(bcryptjs.compare(user.password, hashedPassword));

                case 13:
                    if (_context.sent) {
                        _context.next = 17;
                        break;
                    }

                    throw new ServerError(ErrorType.UNAUTHORIZED.message);

                case 17:
                    _context.next = 19;
                    return regeneratorRuntime.awrap(usersDao.login(user));

                case 19:
                    token = jwt.sign({
                        sub: user
                    }, config.secret);
                    return _context.abrupt("return", token);

                case 21:
                case "end":
                    return _context.stop();
            }
        }
    });
}

;

function logout(userName) {
    return regeneratorRuntime.async(function logout$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(usersDao.logout(userName));

                case 2:
                case "end":
                    return _context2.stop();
            }
        }
    });
}

;

function addUser(user) {
    var usersSystem, newUser;
    return regeneratorRuntime.async(function addUser$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    validateUserData(user);
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(connection.executeWithParameters("SELECT userName FROM users WHERE userName =?", [user.userName]));

                case 3:
                    usersSystem = _context3.sent;
                    console.log(usersSystem);

                    if (!(usersSystem == null || usersSystem.length == 0)) {
                        _context3.next = 13;
                        break;
                    }

                    console.log("good name");
                    _context3.next = 9;
                    return regeneratorRuntime.awrap(usersDao.addUser(user));

                case 9:
                    newUser = _context3.sent;
                    return _context3.abrupt("return", newUser);

                case 13:
                    console.log("hii");
                    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST.message);

                case 15:
                    ;

                case 16:
                case "end":
                    return _context3.stop();
            }
        }
    });
}

;

function getUserById(id) {
    return regeneratorRuntime.async(function getUserById$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(usersDao.getUserById(id));

                case 2:
                case "end":
                    return _context4.stop();
            }
        }
    });
}

;

function getAllUsers(id) {
    var allUsers;
    return regeneratorRuntime.async(function getAllUsers$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(usersDao.getAllUsers(id));

                case 2:
                    allUsers = _context5.sent;
                    return _context5.abrupt("return", allUsers);

                case 4:
                case "end":
                    return _context5.stop();
            }
        }
    });
}

;

function deleteUser(id) {
    return regeneratorRuntime.async(function deleteUser$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.next = 2;
                    return regeneratorRuntime.awrap(usersDao.deleteUser(id));

                case 2:
                case "end":
                    return _context6.stop();
            }
        }
    });
}

;

function updateUser(user) {
    var update;
    return regeneratorRuntime.async(function updateUser$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    validateUserData(user);
                    _context7.next = 3;
                    return regeneratorRuntime.awrap(bcryptjs.hash(user.passord, 10));

                case 3:
                    user.passord = _context7.sent;
                    _context7.next = 6;
                    return regeneratorRuntime.awrap(usersDao.updateUser(user));

                case 6:
                    update = _context7.sent;
                    return _context7.abrupt("return", update);

                case 8:
                case "end":
                    return _context7.stop();
            }
        }
    });
}

;

function validateUserData(user) {
    if (!user.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }

    if (!user.userName) {
        throw new ServerError(ErrorType.INVALID_USER_NAME);
    }

    return true;
}

;
module.exports = {
    login: login,
    logout: logout,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};