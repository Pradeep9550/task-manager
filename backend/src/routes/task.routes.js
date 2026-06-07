import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controller/task.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createTask).get(getTasks);

router.route("/:taskId").get(getTaskById).patch(updateTask).delete(deleteTask);

router.route("/:taskId/toggle").patch(toggleTaskStatus);

export default router;
