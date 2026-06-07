import { Task } from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    title,
    description,
    userId: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, task, "Task created"));
});

export const getTasks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", status } = req.query;

  const query = {
    userId: req.user._id,
  };

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    query.status = status.toUpperCase();
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const totalTasks = await Task.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        tasks,
        totalTasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: Number(page),
      },
      "Tasks fetched",
    ),
  );
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    userId: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json(new ApiResponse(200, task));
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      userId: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json(new ApiResponse(200, task, "Task updated"));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.taskId,
    userId: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Task deleted"));
});

export const toggleTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    userId: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.status = task.status === "PENDING" ? "COMPLETED" : "PENDING";

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated"));
});
