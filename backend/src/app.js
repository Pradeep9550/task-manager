import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/task.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();

app.use(express.json({ limit : "16kb"}))
app.use(express.urlencoded({ extended : true}))
app.use(cookieParser())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))



app.use("/api/auth", authRouter)
app.use("/api/tasks", taskRouter);
app.use(errorHandler)

export default app