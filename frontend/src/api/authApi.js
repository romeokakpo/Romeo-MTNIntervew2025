// src/api/authApi.js
import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endpoints";

export const login = async (credentials) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.REGISTER,
    userData
  );
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};
