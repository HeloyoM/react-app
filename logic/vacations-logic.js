let vacationsDao = require("../dao/vacations-dao");
// const pushLogic = require('./push-logic')

async function addNewVacation(vacation) {
    const newVacation = await vacationsDao.addNewVacation(vacation);
    return newVacation;
};

async function getAllVacations(id) {
    const allvacations = await vacationsDao.getAllVacations(id);
    return allvacations;
};

async function getVacationByPrice(price) {

    const foundedVacations = await vacationsDao.getVacationByPrice(price);
    return foundedVacations;
};

async function getVacationById(id) {
    const vacation = await vacationsDao.getVacationById(id);
    return vacation;
};

async function deleteVacation(id) {
    await vacationsDao.deleteVacation(id);
    pushLogic.boradcastExceptSender("deleteVacation", { id }, senderId);
};

async function updateVacation(vacation) {
    await vacationsDao.updateVacation(vacation);
};

module.exports = {
    addNewVacation,
    getAllVacations,
    getVacationById,
    deleteVacation,
    updateVacation,
    getVacationByPrice
}