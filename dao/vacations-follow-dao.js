const connection = require('../dao/connection-wrapper');

async function addRowToVacationTable(newFollowPacket) {
    let sql = "INSERT INTO followvacations (userName, vacationId) VALUES (?,?)";
    let parameters = [newFollowPacket.userName, newFollowPacket.vacationId];
    const newRow = await connection.executeWithParameters(sql, parameters);
    return newRow;
};

async function deleteFollowing(deleteFollowingPacket) {
    let sql = `DELETE FROM followvacations WHERE username=? and vacationID =?`;
    let parameters = [deleteFollowingPacket.userName, deleteFollowingPacket.id];
    const followingToDelete = await connection.executeWithParameters(sql, parameters);
    return followingToDelete;
};

async function getFollowedVacationsByUserName(userName) {
    let sql = `SELECT vacationid FROM followvacations WHERE userName =?`;
    let parameters = [userName];
    const allFollowedVacations = await connection.executeWithParameters(sql, parameters);
    return allFollowedVacations;
};

async function getAllVacations(id) {
    let sql = `SELECT * FROM followvacations`;
    let parameters = [id];
    const allVacations = await connection.executeWithParameters(sql, parameters);
    return allVacations;
};

module.exports = {
    addRowToVacationTable,
    deleteFollowing,
    getFollowedVacationsByUserName,
    getAllVacations
}