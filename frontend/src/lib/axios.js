import axios from "axios";

const backendUrl = import.meta.env.MODE === "development"
  ? import.meta.env.VITE_BACKEND_URL
  : "/api";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});
