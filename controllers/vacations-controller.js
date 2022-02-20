const express = require("express");
const router = express.Router();
const vacationsLogic = require("../logic/vacations-logic");

//ADD new vacation to vacations table:
//POST http://localhost:3001/vacations
router.post("/", async(request, response, next) => {
    const vacation = {
        vacationID: parseInt(request.body.vacationID),
        img: request.body.img,
        title: request.body.title,
        dscription: request.body.dscription,
        date: request.body.date,
        price: request.body.price,
        lastUpdate: request.body.lastUpdate
    };
    console.log(vacation);
    let newVacation;

    try {
        newVacation = await vacationsLogic.addNewVacation(vacation);
        response.json(newVacation)
    } catch (e) {
        response.json(e);
        return next(e)
    }
    return newVacation;
});

router.get("/price", async(request, response, next) => {
    const query = request.query;
    const price = {
        min: query.min,
        max: query.max
    }
    console.log("min value: " + price.min + "max value " + price.max);
    let foundedVacations;
    try {
        foundedVacations = await vacationsLogic.getVacationByPrice(price);
        response.json(foundedVacations);
    } catch (e) {
        response.json(e);
        return next(e)
    }
    return foundedVacations;
});

//get all vacations from vacations table:
router.get("/", async(request, response, next) => {
    const id = request.params;
    let allVacations;
    try {
        allVacations = await vacationsLogic.getAllVacations(id);
        response.json(allVacations);
    } catch (e) {
        response.json(e)
        return next(e)
    }
    return allVacations
});

//get specific vacation from vacations table
router.get("/:id", async(request, response, next) => {
    let id = request.params.id;
    let vacation;
    try {
        vacation = await vacationsLogic.getVacationById(id);
        response.json(vacation);
        console.log(vacation);
    } catch (error) {
        response.json(error);
        return next(error)
    }
    return vacation;
});

//delete vacation from DB:
router.delete("/:id", async(request, response, next) => {
    let id = request.params.id;
    console.log("vacation by id: " + id + " is removed.")
    let vacationToDelete;
    try {
        vacationToDelete = await vacationsLogic.deleteVacation(id);
        response.json(vacationToDelete);
        console.log(vacationToDelete);
    } catch (error) {
        response.json(error);
        return next(error)
    }
    return vacationToDelete;
});

// UPDATE details of vacation by id:
router.put("/:id", async(request, response, next) => {
    const vacation = {
        title: request.body.title,
        dscription: request.body.dscription,
        date: request.body.date,
        price: request.body.price,
        lastUpdate: request.body.lastUpdate,
        vacationId: request.params.id
    };
    console.log(vacation)
    let update;
    try {
        update = await vacationsLogic.updateVacation(vacation);
        response.json(update);
        console.log(update)
    } catch (error) {
        response.json(error);
        return next(error)
    }
    return update;
});
module.exports = router;