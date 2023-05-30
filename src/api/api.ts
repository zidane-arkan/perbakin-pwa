import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL:
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_VERSION
      ? `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_VERSION}`
      : "http://localhost:8000/api/v1",
});

export default api;
