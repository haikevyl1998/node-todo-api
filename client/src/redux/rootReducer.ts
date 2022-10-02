import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./app/slice";

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
});

export default rootReducer;
