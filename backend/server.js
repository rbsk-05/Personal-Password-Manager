import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
import passwordRoutes from "./routes/passwordRoutes.js";
app.use("/api/passwords", passwordRoutes);

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
