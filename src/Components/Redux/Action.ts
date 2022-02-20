import { ActionType } from "./Action-type";

export interface Action {
    type: ActionType;
    payload?: any;
}
