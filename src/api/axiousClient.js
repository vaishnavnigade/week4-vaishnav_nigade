import axios from "axios";

// Central axios instance so base URL / headers live in one place (reusable).
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach the stored JWT to every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: normalise FastAPI error messages for the UI.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // FastAPI returns errors under `detail`; fall back to a generic message.
    const message =
      error.response?.data?.detail || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;