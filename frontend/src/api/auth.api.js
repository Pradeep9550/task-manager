import api from "./axios";

export const loginRequest = (data) => api.post("/auth/login", data);

export const registerRequest = (data) => api.post("/auth/register", data);

export const changePasswordRequest = (data) =>  api.post("/auth/change-password", data);
 

export const logoutRequest = () => api.post("/auth/logout");

export const currentUserRequest = () => api.get("/auth/current-user");
