// src/api/userApi.js
import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endpoints";

export const getTaskById = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.TASKS.GET_TASK(id));
  return response.data;
};

export const getAllTasks = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.TASKS.GET_ALL_TASKS);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.TASKS.CREATE_TASK,
    taskData
  );
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axiosInstance.put(
    API_ENDPOINTS.TASKS.UPDATE_TASK(id),
    taskData
  );
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(
    API_ENDPOINTS.TASKS.DELETE_TASK(id)
  );
  return response.data;
};
