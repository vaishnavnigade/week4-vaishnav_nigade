import axiosClient from "./axiosClient";

// Thin wrappers around auth endpoints (adjust paths to match your FastAPI).
export const registerUser = (payload) =>
  axiosClient.post("/auth/register", payload).then((res) => res.data);

export const loginUser = (credentials) =>
  axiosClient.post("/auth/login", credentials).then((res) => res.data);

export const getCurrentUser = () =>
  axiosClient.get("/users/me").then((res) => res.data);