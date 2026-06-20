import * as authService from "../services/auth/auth.service.js";

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

    if (!email || !name || !password) {
      res.status(400).json({
        message: "Email, name, and password are required fields",
      });
    }
    const validateEmail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    if (!email.match(validateEmail)) {
      res.status(400).json({
        message: "Invalid email format. Please provide a valid email address",
      });
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const userData = { email, name, password };
    const result = authService.registerUser(userData);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    next(error);
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

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required fields",
      });
    }

    const validateEmail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

    if (!email.match(validateEmail)) {
      res.status(400).json({
        message: "Invalid email format. Please provide a valid email address",
      });
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const result = await authService.loginUser(email, password);

    res.status(200).json({
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    next(error);
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

    if (!credential) {
      res.status(400).json({
        message: "Google credential is required",
      });
    }

    const result = await authService.googleClientLogin(credential);

    res.status(200).json({
      message: "User logged in successfully via Google",
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    next(error);
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
    const user = await authService.getUserProfile(req.user.id);
    return res.status(200).json({
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


/*
    Controller function to handle user logout.
    - It sends a success response indicating that the user has been logged out successfully.
    - If any error occurs during the process, it passes the error to the next middleware for handling.
*/

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

