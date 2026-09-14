/*
    * File: src/app.js
    - Setup Express server with CORS configuration to allow requests from specified origins.
    - The server listens on a port defined in environment variables or defaults to 5000.
    - CORS is configured to allow credentials and restrict access to specified origins for security.
    - The allowed origins include the client URL defined in environment variables and common localhost ports for development.
    - The server is set up to handle JSON requests and can be extended with routes and middleware as needed.

*/

import express from "express";
import cors from "cors";
import router from "./routes/routes.index.js";
import { ENV_VAR } from "./utils/env.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import helmet from "helmet";

import cookieParser from "cookie-parser";
const app = express();

const allowedOrigins = [
  ENV_VAR.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Allow content only from the same origin
        scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com"], // Allow scripts from the same origin and Google APIs
        connectSrc: ["'self'", "https://api.gemini.com"], // Allow connections to the same origin and Gemini API
        imgSrc: ["'self'", "data:"], // Allow images from the same origin and data URIs
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow styles from the same origin and inline styles
      },
    },
  }),
);

// health check route
app.get("/health", (request, response) => {
  return response.json({
    message: "AI Powered Smart Code Translator is running successfully",
    status: 200
  })
})

app.use(express.json());
app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
