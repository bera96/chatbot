import { createSlice } from "@reduxjs/toolkit";

export interface Question {
  _id: string;
  text: string;
  sequence: number;
  timeStamp: string;
}

export interface Answer {
  _id: string;
  questionId: string;
  text: string;
  userId: string;
  timeStamp: string;
}

export interface Sessions {
  sessions: {
    data: {
      _id: string;
      tenantId: string;
      startedAt: string;
      endedAt: string;
      questions: Question[];
      answers: Answer[];
    }[];
    loading: boolean;
    status: string;
  };
  currentSession: {
    data: {
      _id: string;
      tenantId: string;
      startedAt: string;
      endedAt: string;
      questions: Question[];
      answers: Answer[];
    };
    loading: boolean;
    status: string;
  };
}

const initialState: Sessions = {
  sessions: {
    data: [
      {
        _id: "",
        tenantId: "",
        startedAt: "",
        endedAt: "",
        questions: [],
        answers: [],
      },
    ],
    loading: false,
    status: "idle",
  },
  currentSession: {
    data: {
      _id: "",
      tenantId: "",
      startedAt: "",
      endedAt: "",
      questions: [],
      answers: [],
    },
    loading: false,
    status: "idle",
  },
};

const SessionsSlice = createSlice({
  name: "SessionsSlice",
  initialState: initialState,
  reducers: {
    setSessions: (state, action) => {
      state.sessions.data = action.payload;
    },
    setCurrentSession: (state, action) => {
      state.currentSession.data = action.payload;
    },
    clearCurrentSession: (state) => {
      state.currentSession.data = initialState.currentSession.data;
    },
    setCurrentSessionLoading: (state, action) => {
      state.currentSession.loading = action.payload;
    },
    setSessionWithAnswer: (state, action) => {
      state.sessions.data = action.payload;
    },
  },
});
export const {
  setSessions,
  setCurrentSession,
  setCurrentSessionLoading,
  setSessionWithAnswer,
  clearCurrentSession,
} = SessionsSlice.actions;
export default SessionsSlice.reducer;
