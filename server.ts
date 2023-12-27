import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import shortenRouter from "./src/routes/shortenRoute";
dotenv.config();
const URL = process.env.MONGODB_URL as string;
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/shortens", shortenRouter);
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
