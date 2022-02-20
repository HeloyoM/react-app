"use strict";
exports.__esModule = true;
exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType[ActionType["SearchVacation"] = 0] = "SearchVacation";
    ActionType[ActionType["Login"] = 1] = "Login";
    ActionType[ActionType["FollowVacation"] = 2] = "FollowVacation";
    ActionType[ActionType["AddVacation"] = 3] = "AddVacation";
    ActionType[ActionType["RemoveVacation"] = 4] = "RemoveVacation";
    ActionType[ActionType["UpdateVacation"] = 5] = "UpdateVacation";
    ActionType[ActionType["ShowMyVacations"] = 6] = "ShowMyVacations";
    ActionType[ActionType["VacationChoosen"] = 7] = "VacationChoosen";
    ActionType[ActionType["Logout"] = 8] = "Logout";
    ActionType[ActionType["GetVacationsByPrice"] = 9] = "GetVacationsByPrice";
    ActionType[ActionType["Prices"] = 10] = "Prices";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
