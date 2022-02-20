"use strict";

var vacationsFollowDao = require('../dao/vacations-follow-dao');

function addRowToVacationTable(newFollowPacket) {
  var newRow;
  return regeneratorRuntime.async(function addRowToVacationTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(vacationsFollowDao.addRowToVacationTable(newFollowPacket));

        case 2:
          newRow = _context.sent;
          return _context.abrupt("return", newRow);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteFollwing(id) {
  var followingToDelete;
  return regeneratorRuntime.async(function deleteFollwing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(vacationsFollowDao.deleteFollwing(id));

        case 2:
          followingToDelete = _context2.sent;
          return _context2.abrupt("return", followingToDelete);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  addRowToVacationTable: addRowToVacationTable,
  deleteFollwing: deleteFollwing
};