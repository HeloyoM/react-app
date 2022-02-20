"use strict";

var vacationsDao = require("../dao/vacations-dao");

function addNewVacation(vacation) {
  var newVacation;
  return regeneratorRuntime.async(function addNewVacation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(vacationsDao.addNewVacation(vacation));

        case 2:
          newVacation = _context.sent;
          return _context.abrupt("return", newVacation);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getAllVacations(id) {
  var allVacations;
  return regeneratorRuntime.async(function getAllVacations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(vacationsDao.getAllVacations(id));

        case 2:
          allVacations = _context2.sent;
          return _context2.abrupt("return", allVacations);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getVacationById(id) {
  var vacation;
  return regeneratorRuntime.async(function getVacationById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(vacationsDao.getVacationById(id));

        case 2:
          vacation = _context3.sent;
          return _context3.abrupt("return", vacation);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteVacation(id) {
  var vacationToDelete;
  return regeneratorRuntime.async(function deleteVacation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(vacationsDao.deleteVacation(id));

        case 2:
          vacationToDelete = _context4.sent;
          return _context4.abrupt("return", vacationToDelete);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updateVacation(vacation) {
  var update;
  return regeneratorRuntime.async(function updateVacation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(vacationsDao.updateVacation(vacation));

        case 2:
          update = _context5.sent;
          return _context5.abrupt("return", update);

        case 4:
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