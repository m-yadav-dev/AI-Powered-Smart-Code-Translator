import { Router } from "express";
import { authLimiter } from "../utils/rate-limiter.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/auth", authLimiter, authRouter);

export default router;