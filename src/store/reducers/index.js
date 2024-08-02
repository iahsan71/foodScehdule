// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import authReducer from "./authReducer";
import foodReducers from "./foodReducer";

export let rootReducer = combineReducers({
  authUser: authUserReducer,
  food: foodReducers
});

export default rootReducer;
