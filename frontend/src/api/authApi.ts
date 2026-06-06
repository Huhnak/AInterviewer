import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

export const login = async (
  username: string,
  password: string
) => {
  const response = await API.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};