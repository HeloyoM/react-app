"use strict";

var connection = require("../dao/connection-wrapper");

var ErrorType = require("../error/server-error");

var saltRight = "sdkjfhdskajh";
var saltLeft = "--mnlcfs;@!$ ";

var crypto = require('crypto');

var ServerError = require("../error/server-error");

function login(user) {
  var sql, parameters, usersLoginResult;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user.password = crypto.createHash("md5").update(saltLeft + user.passord + saltRight).digest("hex");
          sql = "SELECT * FROM users WHERE userName =? AND password =?";
          parameters = [user.userName, user.password];
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 5:
          usersLoginResult = _context.sent;

          if (!(usersLoginResult == null || usersLoginResult.length == 0)) {
            _context.next = 8;
            break;
          }

          throw new Error(console.log("user don't exsist"));

        case 8:
          console.log("successful login ! ");
          return _context.abrupt("return", usersLoginResult[0]);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addUser(user) {
  var sql, parameters;
  return regeneratorRuntime.async(function addUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sql = "INSERT INTO users VALUES (?,?,?,?)";
          parameters = [user.userId, user.userName, user.password, user.userType];
          _context2.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function isUserExsistByName(userName) {
  var sql, parameters, result;
  return regeneratorRuntime.async(function isUserExsistByName$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sql = "SELECT userName FROM users WHERE userName =?";
          parameters = [userName];
          _context3.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          result = _context3.sent;

          if (!(result[0].userName === userName)) {
            _context3.next = 10;
            break;
          }

          console.log("user name is allready exsist: " + result[0].userName);
          return _context3.abrupt("return", true);

        case 10:
          console.log("Bye!");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}

; // async function login(user) {
//     user.password = crypto.createHash("md5").update(saltLeft + user.passord + saltRight).digest("hex");
//     let sql = "SELECT * FROM users WHERE userName =? AND password =?";
//     let parameters = [user.userName, user.password];
//     let usersLoginResult;
//     try {
//         usersLoginResult = await connection.executeWithParameters(sql, parameters);
//     } catch (e) {
//         throw new Error();
//     }
//     if (usersLoginResult == null || usersLoginResult.length == 0) {
//         throw new Error();
//     }
//     console.log("successful login ! ")
//     console.log(usersLoginResult);
//     return usersLoginResult[0];
// }

function getUserById(id) {
  var sql, parameters, user;
  return regeneratorRuntime.async(function getUserById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          sql = "select * from users where userID=?";
          parameters = [id];
          _context4.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          user = _context4.sent;
          console.log(user);
          return _context4.abrupt("return", user);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getAllUsers(id) {
  var sql, parameters, allUsers;
  return regeneratorRuntime.async(function getAllUsers$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          sql = "SELECT * FROM users";
          parameters = [id];
          _context5.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          allUsers = _context5.sent;
          return _context5.abrupt("return", allUsers);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

; //ADD new user to Users table:
// async function addUser(user) {
//     user.password = crypto.createHash("md5").update(saltLeft + user.passord + saltRight).digest("hex");
//     let sql = "INSERT INTO users VALUES (?,?,?)";
//     let parameters = [user.userName, user.password, user.userType];
//     let newUser;
//     try {
//         newUser = await connection.executeWithParameters(sql, parameters);
//     } catch (e) {
//         alert(ServerError(ErrorType.USER_NAME_ALREADY_EXIST, JSON.stringify(user.userName), e));
//     }
//     return newUser;
// }

function deleteUser(id) {
  var sql, parameters, userToDelete;
  return regeneratorRuntime.async(function deleteUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          sql = "DELETE FROM users WHERE userID =?";
          parameters = [id];
          _context6.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          userToDelete = _context6.sent;
          return _context6.abrupt("return", userToDelete);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
} //UPDATE user details,
//by user or by admin:


function updateUser(user) {
  var sql, parameters, update;
  return regeneratorRuntime.async(function updateUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          sql = "UPDATE users SET userId =?, userName =?, password =?, userType =? WHERE userID = ?";
          parameters = [user.userId, user.userName, user.password, user.userType, user.userID];
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 5:
          update = _context7.sent;
          return _context7.abrupt("return", update);

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](2);
          throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), _context7.t0);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 9]]);
}

module.exports = {
  login: login,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  addUser: addUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  isUserExsistByName: isUserExsistByName
};