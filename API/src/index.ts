import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./auth/routes/authRoutes";
import { notFoundHandler, errorHandler } from "./middleware/errorHandlers";

const app = express();

// Global Middleware
app.use(helmet()); // HTTP headers security
app.use(cors()); // Cross-origin support
app.use(express.json()); // JSON parsing
app.use(morgan("dev")); // Request logging

// Mount Auth API
app.use("/auth", authRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
