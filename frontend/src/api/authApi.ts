import api from "./axios";

type LoginResponse = {
  token: string;
  id: string;
  username: string;
  email: string;
  roleName: string;
}

export const login = async (
  username: string,
  password: string
) : Promise<LoginResponse> => {
  const response = await api.post("/api/auth/login", {
    username,
    password,
  });
  return response.data;
};
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  await api.post("/api/auth/register", {
    username,
    email,
    password,
  });
};