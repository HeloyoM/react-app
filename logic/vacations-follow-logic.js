const vacationsFollowDao = require('../dao/vacations-follow-dao');

async function addRowToVacationTable(newFollowPacket) {
    const newRow = await vacationsFollowDao.addRowToVacationTable(newFollowPacket);
    return newRow;
}
async function deleteFollowing(deleteFollowingPacket) {
    const followingToDelete = await vacationsFollowDao.deleteFollowing(deleteFollowingPacket);
    return followingToDelete;
}
async function getFollowedVacationsByUserName(userName) {
    const allFollowedVacations = await vacationsFollowDao.getFollowedVacationsByUserName(userName);
    return allFollowedVacations;
};

async function getAllVacations(id) {
    const allVacations = await vacationsFollowDao.getAllVacations(id);
    return allVacations;
}
module.exports = {
    addRowToVacationTable,
    deleteFollowing,
    getFollowedVacationsByUserName,
    getAllVacations
}