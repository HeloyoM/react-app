"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.reduce = void 0;
var Action_type_1 = require("./Action-type");
var App_state_1 = require("./App-state");
var jwt_decode_1 = require("jwt-decode");
function reduce(oldAppState, action) {
    if (oldAppState === void 0) { oldAppState = new App_state_1["default"](); }
    var newAppState = __assign({}, oldAppState);
    switch (action.type) {
        case Action_type_1.ActionType.SearchVacation:
            var filteredObject = action.payload.filteredObject;
            newAppState.filteredObject = filteredObject;
            break;
        case Action_type_1.ActionType.GetVacationsByPrice:
            var foundedVacations = action.payload.foundedVacations;
            var filter = [];
            for (var i = 0; i < foundedVacations.length; i++) {
                filter.push(foundedVacations[i].vacationId - 1);
            }
            ;
            newAppState.myVacations = filter;
            break;
        case Action_type_1.ActionType.Login:
            if (action.payload.localstorage) {
                var localstorage = action.payload.localstorage;
                var decode = jwt_decode_1["default"](localstorage);
                var userType = decode.sub.userType;
                var userName = decode.sub.userName;
                newAppState.userName = userName;
                newAppState.userType = userType;
            }
            else if (action.payload.token) {
                var token = action.payload.token;
                var decode = jwt_decode_1["default"](token);
                var userType = decode.sub.userType;
                var userName = decode.sub.userName;
                newAppState.userName = userName;
                newAppState.userType = userType;
            }
            break;
        case Action_type_1.ActionType.Logout:
            var logoutByUserName = action.payload.payloadLogout.userName;
            var logoutByUserType = action.payload.payloadLogout.userType;
            newAppState.userName = logoutByUserName;
            newAppState.userType = logoutByUserType;
            break;
        case Action_type_1.ActionType.FollowVacation:
            var newItemOnTrack = action.payload.id;
            newAppState.newItemOnTrack = newItemOnTrack;
            break;
        case Action_type_1.ActionType.UpdateVacation:
            var vacation = action.payload.vacation;
            newAppState.vacationToUpdate = vacation;
            break;
        case Action_type_1.ActionType.vacationChoosen:
            var vacationChoosen = action.payload.id;
            newAppState.vacationChoosen = vacationChoosen;
            break;
        case Action_type_1.ActionType.ShowMyVacations:
            var myVacations = action.payload.response;
            var filterArray = [];
            for (var i = 0; i < myVacations.length; i++) {
                filterArray.push(myVacations[i].vacationid - 1);
            }
            newAppState.myVacations = filterArray;
            break;
        case Action_type_1.ActionType.RemoveVacation:
            var vacationSelectedByAdmin = action.payload.id;
            newAppState.vacationSelectedByAdmin = vacationSelectedByAdmin;
            break;
    }
    return newAppState;
}
exports.reduce = reduce;
