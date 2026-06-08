import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
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
