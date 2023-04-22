import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import hotelRoutes from "./routes/hotels.js";
import userRoutes from "./routes/users.js";
import roomRoutes from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected sucessfully");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDD connected");
});

//middlewares
app.use(express.json());
app.use(cookieParser());

app.listen(8800, () => {
  connectDB();
  console.log("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  const errorStatusCode = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatusCode).json({
    success: false,
    status: false,
    message: errorMessage,
    stack: err.stack,
  });
});
