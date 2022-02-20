const usersDao = require("../dao/users-dao");
const jwt = require('jsonwebtoken');
const ErrorType = require('../error/error-type');
const ServerError = require('../error/server-error');
const connection = require('../dao/connection-wrapper');
const bcryptjs = require('bcryptjs');
const config = require('../config.json');

async function login(user) {
    if (user.userName !== "admin") {
        user.userType = "costumer"
    } else {
        user.userType = "admin"
    };
    validateUserData(user);
    const findUser = await connection.executeWithParameters(`SELECT * FROM users WHERE userName=?`, [user.userName]);
    if (!findUser.length) {
        throw new ServerError(ErrorType.INVALID_USER_NAME.message);
    } else {
        const hashedPassword = findUser[0].password;
        if (!await bcryptjs.compare(user.password, hashedPassword)) {
            throw new ServerError(ErrorType.UNAUTHORIZED.message);
        } else {
            await usersDao.login(user);
            const token = jwt.sign({ sub: user }, config.secret);
            return token;
        }
    }
};

async function logout(userName) {
    await usersDao.logout(userName);
};

async function addUser(user) {
    const newUser = await usersDao.addUser(user);
    return newUser;
    // validateUserData(user);
    // const usersSystem = await connection.executeWithParameters(`SELECT userName FROM users WHERE userName =?`, [user.userName]);
    // console.log(usersSystem);
    // if (usersSystem == null || usersSystem.length == 0) {
    //     console.log("good name");
    //     const newUser = await usersDao.addUser(user);
    //     return newUser;
    // } else {
    //     console.log("hii");
    //     throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST.message);
    // };
};

async function getUserById(id) {
    await usersDao.getUserById(id);
};
async function getAllUsers(id) {
    const allUsers = await usersDao.getAllUsers(id);
    return allUsers;
};

async function deleteUser(id) {
    await usersDao.deleteUser(id);
};

async function updateUser(user) {
    validateUserData(user);
    user.passord = await bcryptjs.hash(user.passord, 10)
    const update = await usersDao.updateUser(user);
    return update;
};

function validateUserData(user) {
    if (!user.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }

    if (!user.userName) {
        throw new ServerError(ErrorType.INVALID_USER_NAME);
    }
    return true;
};

module.exports = {
    login,
    logout,
    getUserById,
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
};