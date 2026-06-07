import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginRequest,
  registerRequest,
  logoutRequest,
  currentUserRequest,
  changePasswordRequest,
} from "../../api/auth.api";

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, thunkAPI) => {
    try {
      const response = await registerRequest(userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginRequest(credentials);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/currentUser",

  async (_, thunkAPI) => {
    try {
      const response = await currentUserRequest();

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, thunkAPI) => {
    try {
      await logoutRequest();

      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);


export const changePassword = createAsyncThunk(
  "auth/changePassword",

  async (passwordData, thunkAPI) => {
    try {
      const response =
        await changePasswordRequest(
          passwordData
        );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data
      );
    }
  }
);