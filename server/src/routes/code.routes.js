import {Router} from "express";

import * as codeController from "../controllers/code.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const codeRouter = Router();


codeRouter.use(authMiddleware); // Apply authentication middleware to all routes



codeRouter.post("/translate-code", codeController.translateSourceCode);
codeRouter.post("/analyze-complexity", codeController.analyzeComplexity);
codeRouter.post("/explain-code", codeController.explainSourceCode);
codeRouter.post("/optimize-code", codeController.optimizeSourceCode);

export default codeRouter;