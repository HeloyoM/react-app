"use strict";

var express = require('express');

var jwtDecode = require('jwt-decode');

var router = express.Router();

var vacationsFollowLogic = require('../logic/vacations-follow-logic'); //add new follwing after vacation by user:


router.post("", function _callee(request, response, next) {
  var token, decode, userName, newFollowPacket, newRow;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = request.headers.authorization;
          decode = jwtDecode(token);
          userName = decode.sub.userName;
          newFollowPacket = {
            userName: userName,
            vacationId: request.body.index
          };
          console.log(newFollowPacket);
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(vacationsFollowLogic.addRowToVacationTable(newFollowPacket));

        case 8:
          newRow = _context.sent;
          response.json(newRow);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          response.json(_context.t0);
          return _context.abrupt("return", next(_context.t0));

        case 16:
          return _context.abrupt("return", newRow);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
}); //get all followed vacations

router.get("", function _callee2(req, res, next) {
  var id, allVacations;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params;
          console.log(id);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(vacationsFollowLogic.getAllVacations(id));

        case 5:
          allVacations = _context2.sent;
          res.json(allVacations);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          res.json(_context2.t0);
          return _context2.abrupt("return", next(_context2.t0));

        case 13:
          return _context2.abrupt("return", allVacations);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // get the followed vacations per user

router.get("/user", function _callee3(request, response, next) {
  var token, decode, userName, allFollowedVacations;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = request.headers.authorization;
          decode = jwtDecode(token);
          userName = decode.sub.userName;
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(vacationsFollowLogic.getFollowedVacationsByUserName(userName));

        case 6:
          allFollowedVacations = _context3.sent;
          response.json(allFollowedVacations);
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          response.json(_context3.t0);
          return _context3.abrupt("return", next(_context3.t0));

        case 14:
          return _context3.abrupt("return", allFollowedVacations);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); //DELETE a follower after vacation:

router["delete"]("/:id", function _callee4(request, response, next) {
  var token, decode, userName, deleteFollowingPacket, followingToDelete;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = request.headers.authorization;
          decode = jwtDecode(token);
          userName = decode.sub.userName;
          deleteFollowingPacket = {
            id: request.params.id,
            userName: userName
          };
          _context4.prev = 4;
          _context4.next = 7;
          return regeneratorRuntime.awrap(vacationsFollowLogic.deleteFollowing(deleteFollowingPacket));

        case 7:
          followingToDelete = _context4.sent;
          response.json(followingToDelete);
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](4);
          response.json(_context4.t0);
          return _context4.abrupt("return", next(_context4.t0));

        case 15:
          return _context4.abrupt("return", deleteFollwing);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 11]]);
});
module.exports = router;