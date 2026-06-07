import api from "./axios";

export const getTasksRequest = (params) =>
  api.get("/tasks", { params });

export const createTaskRequest = (data) =>
  api.post("/tasks", data);

export const updateTaskRequest = (id, data) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTaskRequest = (id) =>
  api.delete(`/tasks/${id}`);

export const toggleTaskRequest = (id) =>
  api.patch(`/tasks/${id}/toggle`);