import jwt from "jsonwebtoken";
import { ENV_VAR } from "./env.js";

export const generateToken = (res, user) => {
  let response = res;
  let currentUser = user;

  if (!currentUser && response && typeof response === "object" && (response._id || response.id)) {
    currentUser = response;
    response = null;
  }

  if (!currentUser) {
    throw new TypeError("generateToken requires a user object");
  }

  const payload = {
    id: currentUser._id || currentUser.id,
    email: currentUser.email,
  };

  const options = {
    payload: payload,
    expiresIn: ENV_VAR.JWT_EXPIRES_IN || "1h",
    jwtSecret: ENV_VAR.JWT_SECRET || "your_jwt_secret",
  };

  const token = jwt.sign(options.payload, options.jwtSecret, {
    expiresIn: options.expiresIn,
  });

  if (response && typeof response.cookie === "function") {
    response.cookie("token", token, {
      httpOnly: true, // Cookie is not accessible via JavaScript
      secure: ENV_VAR.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days expiration
    });
  }
  
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, ENV_VAR.JWT_SECRET || "your_jwt_secret");
};
