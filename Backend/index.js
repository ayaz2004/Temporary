import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { getBrowser } from "./utils/puppeter.js";

dotenv.config();
// getBrowser();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB is Connected!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDb", err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import vendorRoute from "./routes/vendor.route.js";

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// product
app.use("/api/product", productRoute);

app.use("/api/vendor", vendorRoute);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
