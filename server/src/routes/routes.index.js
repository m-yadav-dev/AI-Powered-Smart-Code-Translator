import { Router } from "express";
import { authLimiter } from "../utils/rate-limiter.js";
import authRouter from "./auth.routes.js";
import codeRouter from "./code.routes.js";
import historyRouter from "./history.routes.js";
const router = Router();

router.use("/auth",authRouter); 
router.use("/code", codeRouter);
router.use("/history", historyRouter);

export default router;