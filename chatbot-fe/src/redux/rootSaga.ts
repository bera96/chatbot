import { all } from "redux-saga/effects";
import { authSagas } from "../pages/auth/store/saga";
import { sessionsSagas } from "../layout/store/saga";

export function* rootSaga() {
  yield all([authSagas(), sessionsSagas()]);
}
