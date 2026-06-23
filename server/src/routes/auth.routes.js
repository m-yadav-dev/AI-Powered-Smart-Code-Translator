import { Router } from "express";
import {
  register,
  login,
  googleAuth,
  getUserProfile,
  logout,
  checkAuthStatus,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

// Public route for user login (no authentication required)

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/google", googleAuth);

// Protected route for user profile (authentication required)

authRouter.get("/get-profile", authMiddleware, getUserProfile);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/check", authMiddleware, checkAuthStatus);

export default authRouter;
