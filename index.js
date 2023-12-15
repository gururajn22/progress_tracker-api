import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from "./routes/url.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/todo", router);
const PORT= process.env.PORT || 4000;
const mongoConn=process.env.MONGO_CONN;
mongoose.connect(mongoConn).then(() => {
  console.log("monogo connection working");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
