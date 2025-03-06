import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endpoints";

export const getAllUsers = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.USERS.GET_ALL_USERS);
  return response.data;
};
