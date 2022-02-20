"use strict";

var connection = require('../dao/connection-wrapper');

function addRowToVacationTable(newFollowPacket) {
  var sql, parameters, newRow;
  return regeneratorRuntime.async(function addRowToVacationTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sql = "INSERT INTO followvacations (userName, vacationId) VALUES (?,?)";
          parameters = [newFollowPacket.userName, newFollowPacket.vacationId];
          _context.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          newRow = _context.sent;
          return _context.abrupt("return", newRow);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteFollwing(id) {
  var sql, parameters, followingToDelete;
  return regeneratorRuntime.async(function deleteFollwing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sql = "DELETE FROM followvacations WHERE vacationID =?";
          parameters = [id];
          _context2.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          followingToDelete = _context2.sent;
          return _context2.abrupt("return", followingToDelete);

        case 6:
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