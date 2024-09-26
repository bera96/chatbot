export const sessionsTypes = {
  GET_SESSIONS: "GET_SESSIONS",
  POST_SESSION: "POST_SESSION",
  GET_CURRENT_SESSION: "GET_CURRENT_SESSION",
  DELETE_SESSION: "DELETE_SESSION",
  POST_ANSWER: "POST_ANSWER",
} as const;

interface SessionsPayload {
  tenantId: string;
}

interface CurrentSessionPayload {
  sessionId: string;
}

interface DeleteSessionPayload {
  sessionId: string;
  tenantId: string;
}

interface AnswerSessionPayload {
  sessionId: string;
  userId: string;
  questionId: string;
  answer: string;
}

export interface SessionsAction {
  type: string;
  payload: SessionsPayload;
}

export interface CurrentSessionAction {
  type: string;
  payload: CurrentSessionPayload;
}

export interface DeleteSessionAction {
  type: string;
  payload: DeleteSessionPayload;
}

export interface AnswerSessionAction {
  type: string;
  payload: AnswerSessionPayload;
}
