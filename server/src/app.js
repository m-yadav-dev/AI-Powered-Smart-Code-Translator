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
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
const app = express();


const allowedOrigins = [
  ENV_VAR.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);
console.log("Allowed Origins:", allowedOrigins);

app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {

    }
  }
}));

app.use(express.json());
app.use("/api", router);


app.use(notFoundHandler)
app.use(errorHandler)
export default app;
