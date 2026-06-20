import { verifyToken } from "../utils/jwt.utils.js";

import User from "../models/User.model.js";

/*
    Middleware function to authenticate requests using JWT tokens.
    - It checks for the presence of the Authorization header in the request.
    - It verifies the JWT token and decodes it to retrieve the user ID.
    - It fetches the user from the database using the decoded user ID.
    - If the user is found, it attaches the user object to the request (req.user) for further use in subsequent middleware or route handlers.
    - If the token is invalid, expired, or the user is not found, it responds with a 401 Unauthorized status and an error message.
    - If any other error occurs during the process, it responds with a 401 Unauthorized status and an error message.
*/

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found, please log in again",
      });
    }

    req.user = user; // Attach the user object to the request for further use
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
