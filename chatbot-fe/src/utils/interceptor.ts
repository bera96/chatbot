import axios from "axios";
import { store } from "../redux/store";
import { setLogout } from "../pages/auth/store/slice";
const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 10000,
});


axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config.baseURL, 'BASEURLLLLLLLLL')
    const token = JSON.parse(localStorage.getItem("user")!)?.user?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setLogout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
