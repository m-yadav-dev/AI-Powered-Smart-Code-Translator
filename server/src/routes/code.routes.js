import {Router} from "express";

import * as codeController from "../controllers/code.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const codeRouter = Router();


codeRouter.use(authMiddleware); // Apply authentication middleware to all routes



codeRouter.post("/translate-code", codeController.translateCode);
codeRouter.post("/analyze-complexity", codeController.analyzeComplexity);
codeRouter.post("/explain-code", codeController.codeExplain);
codeRouter.post("/optimize-code", codeController.optimizeCode);

export default codeRouter;