import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { authTypes, LoginAction, RegisterAction } from "./type";
import { application } from "../../../redux/store";
import axiosInstance from "../../../utils/interceptor";
import { setLogin, setLoginLoading, setRegister, setRegisterLoading } from "./slice";

function* loginHandler(action: LoginAction) {
  const { payload } = action;
  try {
    yield put(setLoginLoading(true));
    const response: AxiosResponse = yield call(() =>
      axiosInstance.post(`${application.api}/auth/login`, payload)
  );
    yield put(setLogin(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* registerHandler(action: RegisterAction) {
  const { payload } = action;
  try {
    yield put(setRegisterLoading(true));
    const response: AxiosResponse = yield call(() =>
      axiosInstance.post(`${application.api}/auth/register`, payload)
    );
    yield put(setRegister(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setRegisterLoading(false));
  }
}

export function* authSagas() {
  yield all([
    takeEvery(authTypes.POST_LOGIN, loginHandler),
    takeEvery(authTypes.POST_REGISTER, registerHandler),
  ]);
}
