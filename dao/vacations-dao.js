const connection = require("../dao/connection-wrapper");

async function addNewVacation(vacation) {
    let sql = "INSERT INTO vacations (vacationID ,img, title, dscription, date, price,lastUpdate) VALUES (?,?,?,?,?,?,?)";
    let parameters = [vacation.vacationID, vacation.img, vacation.title, vacation.dscription, vacation.date, vacation.price, vacation.lastUpdate];
    let newVacation = await connection.executeWithParameters(sql, parameters);
    return newVacation;
};

async function getAllVacations(id) {
    let sql = "SELECT * FROM vacations";
    let parameters = [id];
    let allVacations = await connection.executeWithParameters(sql, parameters);
    return allVacations;
};

async function getVacationByPrice(price) {
    let sql = `SELECT vacationId, title FROM vacations WHERE price BETWEEN ? AND ?`;
    let parameters = [price.min, price.max];
    const foundedVacations = await connection.executeWithParameters(sql, parameters);
    return foundedVacations;
};

async function getVacationById(id) {
    let sql = "SELECT * FROM vacations WHERE vacationID =?";
    let parameters = [id];
    const vacation = await connection.executeWithParameters(sql, parameters);
    return vacation;
};

async function deleteVacation(id) {
    let sql = "DELETE FROM vacations WHERE vacationID =?";
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
};

async function updateVacation(vacation) {
    let sql = "UPDATE vacations SET title=? ,dscription=?, date=?, price =?,lastUpdate=? WHERE vacationID=?;";
    let parameters = [vacation.title, vacation.dscription, vacation.date, vacation.price, vacation.lastUpdate, vacation.vacationId];
    const update = await connection.executeWithParameters(sql, parameters);
    return update;
};

module.exports = {
    addNewVacation,
    getAllVacations,
    getVacationById,
    deleteVacation,
    updateVacation,
    getVacationByPrice
}