import { createStore } from "redux";
import { reduce } from "../Redux/Reducer"

export const store = createStore(reduce);

