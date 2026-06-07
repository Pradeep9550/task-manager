export const selectTasks = (state) => state.tasks.tasks;

export const selectTaskLoading = (state) => state.tasks.loading;

export const selectTaskFilters = (state) => state.tasks.filters;

export const selectPagination = (state) => ({
  currentPage: state.tasks.currentPage,

  totalPages: state.tasks.totalPages,

  totalTasks: state.tasks.totalTasks,
});
