let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwtDecode = require('jwt-decode');

router.post("/login", async(request, response, next) => {
    const user = {
        userName: request.body.userName,
        password: request.body.password,
        userType: String
    };

    let successfulLoginData;
    try {
        successfulLoginData = await usersLogic.login(user);
        response.json(successfulLoginData);
    } catch (e) {
        response.json(e);
        return next(e);
    }
    return successfulLoginData;
});

//logout from system:
router.delete("/loginsystem/user", async(request, response, next) => {
    const token = request.headers.authorization;
    const decode = jwtDecode(token);
    const userName = decode.sub.userName;
    try {
        await usersLogic.logout(userName);
        response.json()
    } catch (e) {
        response.json(e);
        return next(e);
    }
    return;
})


//Add new user;
router.post("/", async(request, response) => {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
        username: request.body.username,
        password: hashedPassword,
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        city: request.body.city,
        address: request.body.address,
        phone: request.body.phone,
        idNumber: request.body.idNumber,
        userType: "user"
    };
    console.log(user);
    try {
        let newUser = await usersLogic.addUser(user);
        response.json(newUser);
    } catch (e) {
        response.json(e)
    }
    // const hashedPassword = await bcryptjs.hash(requset.body.password, 10)
    // const user = {
    //     userName: requset.body.userName,
    //     password: hashedPassword
    // };
    // let newUser;
    // try {
    //     newUser = await usersLogic.addUser(user);
    //     response.json(newUser)
    // } catch (error) {
    //     response.json(error);
    //     return next(error);
    // }
    // return newUser;
});


//GET http://localhost:3001/users/:id
//Get one user from users table
router.get("/:id", async(request, response, next) => {
    let id = request.params.id;
    let user;
    try {
        user = await usersLogic.getUserById(id);
        response.json(user);
    } catch (error) {
        return next(error);
    }
    return user;
})



//GET http://localhost:3001/users/
//Get all users from users table
router.get("/", async(request, response, next) => {
    let id = request.params;
    let allUsers;
    try {
        allUsers = await usersLogic.getAllUsers(id);
        console.log(allUsers);
        response.json(allUsers);
    } catch (e) {
        response.json(e);
        return next(e);
    }
    return allUsers;
})



//only by admin
//DELETE user from users table:
router.delete("/:id", async(requset, response, next) => {
    let id = requset.params.id;
    let userToDelete;
    try {
        userToDelete = await usersLogic.deleteUser(id);
        response.json(userToDelete);
        console.log(userToDelete)
    } catch (error) {
        response.json(error);
        return next(error);
    }
    return userToDelete;
});

//PUT update user details:
router.put("/:id", async(requset, response, next) => {
    let user = requset.body;
    let update;
    console.log(user);
    try {
        update = await usersLogic.updateUser(user);
        response.json(update);
    } catch (error) {
        response.json(error);
        return next(error)
    }
    return update;
});

module.exports = router;