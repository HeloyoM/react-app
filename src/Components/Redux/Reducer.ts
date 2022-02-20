import { Action } from "./Action";
import { ActionType } from "./Action-type";
import AppState from "./App-state";
import jwtDecode from "jwt-decode";

export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {

    let newAppState = { ...oldAppState }

    switch (action.type) {
        case ActionType.SearchVacation:
            const filteredObject = action.payload.filteredObject;
            newAppState.filteredObject = filteredObject;
            break;
        case ActionType.GetVacationsByPrice:
            const foundedVacations = action.payload.foundedVacations;
            let filter = [];
            for (let i = 0; i < foundedVacations.length; i++) {
                filter.push(foundedVacations[i].vacationId - 1);
            };
            newAppState.myVacations = filter;
            break;
        case ActionType.Login:
            if (action.payload.localstorage) {
                const localstorage = action.payload.localstorage;
                const decode: any = jwtDecode(localstorage);
                const userType = decode.sub.userType;
                const userName = decode.sub.userName;
                newAppState.userName = userName;
                newAppState.userType = userType;
            } else if (action.payload.token) {
                const token = action.payload.token;
                const decode: any = jwtDecode(token);
                const userType = decode.sub.userType;
                const userName = decode.sub.userName;
                newAppState.userName = userName;
                newAppState.userType = userType;
            }
            break;
        case ActionType.Logout:
            const logoutByUserName = action.payload.payloadLogout.userName;
            const logoutByUserType = action.payload.payloadLogout.userType
            newAppState.userName = logoutByUserName;
            newAppState.userType = logoutByUserType;
            break;
        case ActionType.FollowVacation:
            const newItemOnTrack = action.payload.id;
            newAppState.newItemOnTrack = newItemOnTrack;
            break;
        case ActionType.UpdateVacation:
            const vacation = action.payload.vacation;
            newAppState.vacationToUpdate = vacation;
            break;
        case ActionType.ShowMyVacations:
            const myVacations = action.payload.response;
            let filterArray = [];
            for (let i = 0; i < myVacations.length; i++) {
                filterArray.push(myVacations[i].vacationid - 1);
            }
            newAppState.myVacations = filterArray;
            break;
        case ActionType.RemoveVacation:
            const vacationSelectedByAdmin = action.payload.id;
            newAppState.vacationSelectedByAdmin = vacationSelectedByAdmin;
            break;
        case ActionType.UserDetails:
            const user = action.payload.user;
            console.log(user)
            newAppState.user = user;
            break;
    }
    return newAppState;
}
