import * as authService from "../services/auth/auth.service.js";
import { ENV_VAR } from "../utils/env.js";
import validator from "validator";

/*
    Controller function to handle user registration.
    - It receives the user registration data from the request body.
    - It validates the input data (email, name, password) and checks for required fields.
    - If the input is valid, it calls the registerUser function from the authService to create a new user.
    - If the registration is successful, it sends a success response with the registered user data.
    - If any error occurs during the process, it passes the error to the next middleware for handling.

*/

export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!email.trim() || !name.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, name, and password are required fields",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. Please provide a valid email address",
      });
    }
    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const userData = { email, name, password };
    const result = await authService.registerUser(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

/*
    Controller function to handle user login.
    - It receives the user login data (email and password) from the request body.
    - It validates the input data and checks for required fields.
    - If the input is valid, it calls the loginUser function from the authService to authenticate the user.
    - If the login is successful, it sends a success response with the user data and JWT token.
    - If any error occurs during the process, it passes the error to the next middleware for handling.
*/

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. Please provide a valid email address",
      });
    }

    const result = await authService.loginUser(email, password);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

/*
    Controller function to handle Google OAuth authentication.
    - It receives the Google credential from the request body.
    - It validates the input data and checks for the required credential field.
    - If the input is valid, it calls the googleClientLogin function from the authService to authenticate the user via Google OAuth.
    - If the authentication is successful, it sends a success response with the user data and JWT token.
    - If any error occurs during the process, it passes the error to the next middleware for handling.
*/

export const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential || typeof credential !== "string") {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }
    const result = await authService.googleClientLogin(credential);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully via Google",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

/*
    Controller function to handle fetching the user profile.
    - It retrieves the user ID from the authenticated request (req.user.id).
    - It calls the getUserProfile function from the authService to fetch the user's profile data from the database.
    - If the profile retrieval is successful, it sends a success response with the user profile data.
    - If any error occurs during the process, it passes the error to the next middleware for handling.
*/
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await authService.getUserProfile(userId);
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

/*
    Controller function to handle user logout.
    - It sends a success response indicating that the user has been logged out successfully.
    - If any error occurs during the process, it passes the error to the next middleware for handling.
*/

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: ENV_VAR.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const checkAuthStatus = (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};
