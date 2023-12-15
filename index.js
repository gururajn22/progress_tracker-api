import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from "./routes/url.js";

const app = express();
dotenv.config({ path: '.env' }); 

app.use(cors());
app.use(express.json());
app.use("/todo", router);

const PORT = process.env.PORT || 4000;
const mongoConn = process.env.MONGO_CONN;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoConn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
