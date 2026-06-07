import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  logoutUser,
  getCurrentUser,
  registerUser,
} from "./authThunk";

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })

      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
