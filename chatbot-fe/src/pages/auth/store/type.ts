export const authTypes = {
  POST_LOGIN: "POST_LOGIN",
  POST_REGISTER: "POST_REGISTER",
} as const;

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterAction {
  type: string;
  payload: RegisterPayload;
}

export interface LoginAction {
  type: string;
  payload: LoginPayload;
}
