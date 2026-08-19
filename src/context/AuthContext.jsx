import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/authService";

const AuthContext = createContext(null);

// Provider exposes auth state + actions to the whole app (reusable hook below).
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Register does not auto-login here; user is redirected to the login page.
  const register = (payload) => registerUser(payload);

  // Login stores the JWT so the axios interceptor can use it.
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

  const value = { token, isAuthenticated: !!token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook keeps components clean and enforces provider usage.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};