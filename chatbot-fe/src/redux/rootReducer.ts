import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../pages/auth/store/slice";
import sessionsReducer from "../layout/store/slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  sessions: sessionsReducer,
});
