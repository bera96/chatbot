import { createSlice } from "@reduxjs/toolkit";

export interface UserType {
  user: {
    accessToken: string;
    name: string;
    email: string;
    _id: string;
  };
}

export interface AuthType {
  auth: {
    data: UserType;
    loading: boolean;
    status: string;
  };
}

const initialState: AuthType = {
  auth: {
    data: {
      user: {
        accessToken: "",
        name: "",
        email: "",
        _id: "",
      },
    },
    loading: false,
    status: "idle",
  },
};

const AuthSlice = createSlice({
  name: "LoginSlice",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.auth.data = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLogout: (state) => {
      state.auth.data = initialState.auth.data;
      localStorage.removeItem("user");
    },
    setRegister: (state, action) => {
      state.auth.data = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setRegisterLoading: (state, action) => {
      state.auth.loading = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.auth.loading = action.payload;
    },
  },
});
export const { setLogin, setLogout, setRegister, setRegisterLoading, setLoginLoading } =
  AuthSlice.actions;
export default AuthSlice.reducer;
