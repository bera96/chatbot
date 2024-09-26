import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { AnswerSessionAction, CurrentSessionAction, SessionsAction, sessionsTypes } from "./type";
import { application } from "../../redux/store";
import axiosInstance from "../../utils/interceptor";
import { setCurrentSession, setCurrentSessionLoading, setSessions } from "./slice";

function* getAllSessionsHandler(action: SessionsAction) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(() =>
      axiosInstance.get(`${application.api}/sessions/user/${payload.tenantId}`)
    );
    yield put(setSessions(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
  }
}

function* postSessionHandler(action: SessionsAction) {
  const { payload } = action;
  try {
    yield call(() => axiosInstance.post(`${application.api}/sessions`, payload));
    yield getAllSessionsHandler({ payload } as any);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* getCurrentSessionHandler(action: CurrentSessionAction) {
  const { payload } = action;
  try {
    setCurrentSessionLoading(true);
    const response: AxiosResponse = yield call(() =>
      axiosInstance.get(`${application.api}/sessions/session/${payload.sessionId}`)
    );
    yield put(setCurrentSession(response.data));
    yield getAllSessionsHandler({ payload } as any);
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
    setCurrentSessionLoading(false);
  }
}

function* postSessionWithAnswer(action: AnswerSessionAction) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(() =>
      axiosInstance.post(`${application.api}/sessions/answer`, payload)
    );
    yield put(setCurrentSession(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* deleteSessionHandler(action: CurrentSessionAction) {
  const { payload } = action;
  try {
    yield call(() => axiosInstance.delete(`${application.api}/sessions/${payload.sessionId}`));
    yield getAllSessionsHandler({ payload } as any);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

export function* sessionsSagas() {
  yield all([
    takeEvery(sessionsTypes.GET_SESSIONS, getAllSessionsHandler),
    takeEvery(sessionsTypes.POST_SESSION, postSessionHandler),
    takeEvery(sessionsTypes.GET_CURRENT_SESSION, getCurrentSessionHandler),
    takeEvery(sessionsTypes.DELETE_SESSION, deleteSessionHandler),
    takeEvery(sessionsTypes.POST_ANSWER, postSessionWithAnswer),
  ]);
}
