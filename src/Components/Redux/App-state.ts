import { IVacationCard } from "../Card/Card";

export default class AppState {
    public filteredObject: IVacationCard[] = [];
    public userType = '';
    public vacationSelectedByAdmin = '';
    public newItemOnTrack = '';
    public userName = '';
    public vacationToUpdate = {};
    public vacationChoosen = '';
    public sortVacation = [];
    public myVacations = [];
    public user;
}