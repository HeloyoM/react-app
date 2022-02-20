const express = require('express');
const jwtDecode = require('jwt-decode');
const router = express.Router();
const vacationsFollowLogic = require('../logic/vacations-follow-logic');

//add new follwing after vacation by user:
router.post("", async(request, response, next) => {
    const token = request.headers.authorization;
    const decode = jwtDecode(token);
    const userName = decode.sub.userName;
    const newFollowPacket = {
        userName: userName,
        vacationId: request.body.index
    };
    console.log(newFollowPacket);
    let newRow;
    try {
        newRow = await vacationsFollowLogic.addRowToVacationTable(newFollowPacket);
        response.json(newRow);
    } catch (e) {
        response.json(e);
        return next(e)
    }
    return newRow;
});

//get all followed vacations
router.get("", async(req, res, next) => {
    const id = req.params;
    console.log(id)
    let allVacations;
    try {
        allVacations = await vacationsFollowLogic.getAllVacations(id);
        res.json(allVacations);
    } catch (e) {
        res.json(e);
        return next(e)
    }
    return allVacations;
});

// get the followed vacations per user
router.get("/user", async(request, response, next) => {
    const token = request.headers.authorization;
    const decode = jwtDecode(token);
    const userName = decode.sub.userName;
    let allFollowedVacations;
    try {
        allFollowedVacations = await vacationsFollowLogic.getFollowedVacationsByUserName(userName);
        response.json(allFollowedVacations)
    } catch (e) {
        response.json(e);
        return next(e)
    }
    return allFollowedVacations;
});

//DELETE a follower after vacation:
router.delete("/:id", async(request, response, next) => {
    const token = request.headers.authorization;
    const decode = jwtDecode(token);
    const userName = decode.sub.userName;
    const deleteFollowingPacket = {
        id: request.params.id,
        userName: userName
    }
    let followingToDelete;
    try {
        followingToDelete = await vacationsFollowLogic.deleteFollowing(deleteFollowingPacket);
        response.json(followingToDelete);
    } catch (e) {
        response.json(e);
        return next(e)
    }
    return deleteFollwing;
});


module.exports = router;