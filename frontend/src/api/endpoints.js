// src/api/endpoints.js
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/token/",
    REGISTER: "/register/",
    REFRESH: "/token/refresh/",
    LOGOUT: "/auth/logout/",
  },
  TASKS: {
    GET_TASK: (id) => `/tasks/${id}/`,
    GET_ALL_TASKS: "/tasks/",
    CREATE_TASK: "/tasks/",
    UPDATE_TASK: (id) => `/tasks/${id}/`,
    DELETE_TASK: (id) => `/tasks/${id}/`,
  },
  USERS: {
    GET_USER: (id) => `/users/${id}/`,
    GET_ALL_USERS: "/users/",
  },
};

export default API_ENDPOINTS;
