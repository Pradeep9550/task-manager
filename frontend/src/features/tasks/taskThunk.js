import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  toggleTaskRequest,
} from "../../api/task.api";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",

  async (params, thunkAPI) => {
    try {
      const response = await getTasksRequest(params);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",

  async (taskData, thunkAPI) => {
    try {
      const response = await createTaskRequest(taskData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",

  async ({ taskId, taskData }, thunkAPI) => {
    try {
      const response = await updateTaskRequest(taskId, taskData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",

  async (taskId, thunkAPI) => {
    try {
      await deleteTaskRequest(taskId);

      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",

  async (taskId, thunkAPI) => {
    try {
      const response = await toggleTaskRequest(taskId);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
