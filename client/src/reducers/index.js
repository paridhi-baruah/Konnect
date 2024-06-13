import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer.js";
import PostReducer from "./PostReducer.js";
export const reducers=combineReducers({AuthReducer,PostReducer});