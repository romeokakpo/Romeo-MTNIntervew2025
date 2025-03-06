// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Remplacez par l'URL de votre API
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pour attacher un token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor pour gérer les erreurs globales
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const authRoutes = ["/auth", "/login", "/register"];
      const isAuthRoute = authRoutes.some((route) =>
        window.location.pathname.includes(route)
      );
      if (!isAuthRoute) {
        // Rediriger l'utilisateur vers la page d'accueil
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
