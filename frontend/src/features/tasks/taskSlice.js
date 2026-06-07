import { createSlice } from "@reduxjs/toolkit";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "./taskThunk";

const initialState = {
  tasks: [],
  totalTasks: 0,
  totalPages: 0,
  currentPage: 1,

  loading: false,
  error: null,

  filters: {
    search: "",
    status: "",
    page: 1,
    limit: 10,
  },
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.filters.search = action.payload;

      state.filters.page = 1;
    },

    setStatus: (state, action) => {
      state.filters.status = action.payload;

      state.filters.page = 1;
    },

    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;

        state.tasks = action.payload.tasks;

        state.totalTasks = action.payload.totalTasks;

        state.totalPages = action.payload.totalPages;

        state.currentPage = action.payload.currentPage;
      })

      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { setSearch, setStatus, setPage } = taskSlice.actions;

export default taskSlice.reducer;
