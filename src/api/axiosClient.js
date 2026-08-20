import axios from "axios";
 
const axiosClient = axios.create({ baseURL: "http://localhost:8000" });
 
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");        // ← must match what login saves
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
 
export default axiosClient;