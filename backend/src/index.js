import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error");
  });
