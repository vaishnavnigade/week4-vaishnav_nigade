import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/authService";

const AuthContext = createContext(null);

// Reads the payload inside the JWT (name/email are usually stored there).
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const user = token ? decodeToken(token) : null;

  const register = (payload) => registerUser(payload);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = { token, user, isAuthenticated: !!token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
