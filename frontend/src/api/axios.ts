import axios from "axios";
import { useAuthStore } from "../store/userStore";

const api = axios.create({
  // baseURL: "https://ainterviewer-s5ab.onrender.com"
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization =`Bearer ${token}`;
  }
  return config;
},
(error) => {
    return Promise.reject(error);
  }
);

export default api;