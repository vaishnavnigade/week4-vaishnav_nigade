import axiosClient from "./axiosClient";

// Auth endpoints per actual Swagger (no /users/me endpoint exists).
export const registerUser = (payload) =>
  axiosClient.post("/auth/register", payload).then((res) => res.data);

export const loginUser = (credentials) =>
  axiosClient.post("/auth/login", credentials).then((res) => res.data);