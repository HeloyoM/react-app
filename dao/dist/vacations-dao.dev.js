"use strict";

var connection = require("../dao/connection-wrapper");

function addNewVacation(vacation) {
  var sql, parameters, newVacation;
  return regeneratorRuntime.async(function addNewVacation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sql = "INSERT INTO vacations (vacationID ,img, title, dscription, date, price,lastUpdate) VALUES (?,?,?,?,?,?,?)";
          parameters = [vacation.vacationID, vacation.img, vacation.title, vacation.dscription, vacation.date, vacation.price, vacation.lastUpdate];
          _context.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          newVacation = _context.sent;
          return _context.abrupt("return", newVacation);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getAllVacations(id) {
  var sql, parameters, allVacations;
  return regeneratorRuntime.async(function getAllVacations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sql = "SELECT * FROM vacations";
          parameters = [id];
          _context2.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          allVacations = _context2.sent;
          return _context2.abrupt("return", allVacations);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getVacationById(id) {
  var sql, parameters, vacation;
  return regeneratorRuntime.async(function getVacationById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sql = "SELECT * FROM vacations WHERE vacationID =?";
          parameters = [id];
          _context3.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          vacation = _context3.sent;
          return _context3.abrupt("return", vacation);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteVacation(id) {
  var sql, parameters, vacationToDelete;
  return regeneratorRuntime.async(function deleteVacation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          sql = "DELETE FROM vacations WHERE vacationID =?";
          parameters = [id];
          _context4.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          vacationToDelete = _context4.sent;
          return _context4.abrupt("return", vacationToDelete);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updateVacation(vacation) {
  var sql, parameters, update;
  return regeneratorRuntime.async(function updateVacation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          sql = "UPDATE vacations SET title=? ,dscription=?, date=?, price =?,lastUpdate=? WHERE vacationID=?;";
          parameters = [vacation.title, vacation.dscription, vacation.date, vacation.price, vacation.lastUpdate, vacation.vacationId];
          _context5.next = 4;
          return regeneratorRuntime.awrap(connection.executeWithParameters(sql, parameters));

        case 4:
          update = _context5.sent;
          return _context5.abrupt("return", update);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

module.exports = {
  addNewVacation: addNewVacation,
  getAllVacations: getAllVacations,
  getVacationById: getVacationById,
  deleteVacation: deleteVacation,
  updateVacation: updateVacation
};