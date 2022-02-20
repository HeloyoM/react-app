let connection = require("../dao/connection-wrapper");
const ServerError = require('../error/server-error');
const ErrorType = require('../error/error-type');

async function login(user) {
    let sql = `SELECT * FROM users WHERE userName=? AND password=?`;
    let parameters = [user.userName, user.password];
    let usersLoginResult = await connection.executeWithParameters(sql, parameters);
    await connection.executeWithParameters(`INSERT INTO loginSystem (userName, userType) VALUES ((SELECT userName FROM users WHERE userName=?),?)`, [user.userName, user.userType]);
    return usersLoginResult[0];
};

async function logout(userName) {
    let sql = `DELETE FROM loginsystem WHERE userName=?`;
    let parameters = [userName];
    await connection.executeWithParameters(sql, parameters);
};
async function addUser(user) {
    let sql = `INSERT INTO users (username, password, email, city, street,firstName,lastName,idNumber,phone, userType) VALUES (?,?,?,?,?, ?,?,?,?, ?);`;
    let parameters = [user.username, user.password, user.email, user.city, user.address, user.firstName, user.lastName, user.idNumber, user.phone, user.userType];
    const newUser = await connection.executeWithParameters(sql, parameters);
    return newUser;
};
``
async function getUserById(id) {
    let sql = "select * from users where userID=?";
    let parameters = [id];
    let user = await connection.executeWithParameters(sql, parameters)
    console.log(user);
    return user;
}
async function getAllUsers(id) {
    let sql = "SELECT * FROM users";
    let parameters = [id]
    let allUsers = await connection.executeWithParameters(sql, parameters);
    return allUsers;
};

async function deleteUser(id) {
    let sql = "DELETE FROM users WHERE userID =?";
    let parameters = [id];
    const userToDelete = await connection.executeWithParameters(sql, parameters);
    return userToDelete;
}

//UPDATE user details,
//by user or by admin:
async function updateUser(user) {
    let sql = "UPDATE users SET userId =?, userName =?, password =?, userType =?";
    let parameters = [user.userId, user.userName, user.password, user.userType];
    const update = await connection.executeWithParameters(sql, parameters);
    return update;
}


module.exports = {
    login,
    logout,
    getUserById,
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
};