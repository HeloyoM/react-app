"use strict";

var express = require("express");

var router = express.Router();

var vacationsLogic = require("../logic/vacations-logic");

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './images/');
    },
    filename: function filename(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
}); //ADD new vacation to vacations table:
//POST http://localhost:3001/vacations

router.post("/", upload.single('img'), function _callee(request, response) {
    var vacation, newVacation;
    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    vacation = {
                        vacationID: parseInt(request.body.vacationID),
                        img: request.file,
                        title: request.body.title,
                        dscription: request.body.dscription,
                        date: request.body.date,
                        price: request.body.price,
                        lastUpdate: request.body.lastUpdate
                    };
                    _context.prev = 1;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(vacationsLogic.addNewVacation(vacation));

                case 4:
                    newVacation = _context.sent;
                    response.json(newVacation);
                    _context.next = 12;
                    break;

                case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](1);
                    response.json(_context.t0);
                    console.log(_context.t0);

                case 12:
                    return _context.abrupt("return", newVacation);

                case 13:
                case "end":
                    return _context.stop();
            }
        }
    }, null, null, [
        [1, 8]
    ]);
}); //get all vacations from vacations table:

router.get("/", upload.single('img'), function _callee2(request, response) {
    var id, allVacations;
    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    id = request.params;
                    _context2.prev = 1;
                    _context2.next = 4;
                    return regeneratorRuntime.awrap(vacationsLogic.getAllVacations(id));

                case 4:
                    allVacations = _context2.sent;
                    response.json(allVacations);
                    _context2.next = 11;
                    break;

                case 8:
                    _context2.prev = 8;
                    _context2.t0 = _context2["catch"](1);
                    response.json(_context2.t0);

                case 11:
                    return _context2.abrupt("return", allVacations);

                case 12:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, null, [
        [1, 8]
    ]);
}); //get specific vacation from vacations table

router.get("/:id", upload.single('img'), function _callee3(request, response) {
    var id, vacation;
    return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    console.log(request.file.path);
                    id = request.params.id;
                    _context3.prev = 2;
                    _context3.next = 5;
                    return regeneratorRuntime.awrap(vacationsLogic.getVacationById(id));

                case 5:
                    vacation = _context3.sent;
                    response.json(vacation);
                    console.log(vacation);
                    _context3.next = 13;
                    break;

                case 10:
                    _context3.prev = 10;
                    _context3.t0 = _context3["catch"](2);
                    response.json(_context3.t0);

                case 13:
                    return _context3.abrupt("return", vacation);

                case 14:
                case "end":
                    return _context3.stop();
            }
        }
    }, null, null, [
        [2, 10]
    ]);
}); //delete vacation from DB:

router["delete"]("/:id", function _callee4(request, response) {
    var id, vacationToDelete;
    return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    id = request.params.id;
                    console.log("vacation by id: " + id + " is removed.");
                    _context4.prev = 2;
                    _context4.next = 5;
                    return regeneratorRuntime.awrap(vacationsLogic.deleteVacation(id));

                case 5:
                    vacationToDelete = _context4.sent;
                    response.json(vacationToDelete);
                    console.log(vacationToDelete);
                    _context4.next = 13;
                    break;

                case 10:
                    _context4.prev = 10;
                    _context4.t0 = _context4["catch"](2);
                    response.json(_context4.t0);

                case 13:
                    return _context4.abrupt("return", vacationToDelete);

                case 14:
                case "end":
                    return _context4.stop();
            }
        }
    }, null, null, [
        [2, 10]
    ]);
}); // UPDATE details of vacation by id:

router.put("/:id", function _callee5(request, response) {
    var vacation, update;
    return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    vacation = {
                        title: request.body.title,
                        dscription: request.body.dscription,
                        date: request.body.date,
                        price: request.body.price,
                        lastUpdate: request.body.lastUpdate,
                        vacationId: request.params.id
                    };
                    console.log(vacation);
                    _context5.prev = 2;
                    _context5.next = 5;
                    return regeneratorRuntime.awrap(vacationsLogic.updateVacation(vacation));

                case 5:
                    update = _context5.sent;
                    response.json(update);
                    console.log(update);
                    _context5.next = 13;
                    break;

                case 10:
                    _context5.prev = 10;
                    _context5.t0 = _context5["catch"](2);
                    response.json(_context5.t0);

                case 13:
                    return _context5.abrupt("return", update);

                case 14:
                case "end":
                    return _context5.stop();
            }
        }
    }, null, null, [
        [2, 10]
    ]);
});
module.exports = router;
module.exports = router;