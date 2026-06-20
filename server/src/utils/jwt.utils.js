import  jwt  from "jsonwebtoken";
import { ENV_VAR } from "./env.js";

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    payload: payload,
    expiresIn: ENV_VAR.JWT_EXPIRES_IN || "1h",
    jwtSecret: ENV_VAR.JWT_SECRET || "your_jwt_secret",
  };

  const token = jwt.sign(options.payload, options.jwtSecret, {
    expiresIn: options.expiresIn,
  });

  return token;
};


export const verifyToken = (token) => {
  return jwt.verify(token, ENV_VAR.JWT_SECRET || "your_jwt_secret");
}


