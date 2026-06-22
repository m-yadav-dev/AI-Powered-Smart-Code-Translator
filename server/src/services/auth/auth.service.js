import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../../models/User.model.js";
import { generateToken } from "../../utils/jwt.utils.js";
import { verifyGoogleToken } from "../../config/google.config.js";

/*
/register API endpoint
  - This function handles user registration by checking if the user already exists in the database.
  - If the user does not exist, it hashes the provided password and creates a new user in the database.
  - It then generates a JWT token for the newly registered user and returns it along with user details.
  - If the user already exists, it throws an error with a status code of 400 (Bad Request).
*/

export const registerUser = async (userData) => {
  const { email, name, password } = userData;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    const error = new Error("User with this email already exists");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

/*
 /login API endpoint
  - This function handles user login by verifying the provided email and password.
  - It checks if the user exists in the database and compares the provided password with the stored hashed password.
  - If the credentials are valid, it generates a JWT token for the user and returns it along with user details.
  - If the credentials are invalid, it throws an error with a status code of 401 (Unauthorized).
*/
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password"); // Select the password field explicitly since it's not selected by default in the User model
  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  await User.updateOne({ _id: user._id }, { lastLogin: new Date() }); // Update the lastLogin field to the current date and time
  const token = generateToken(user);
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

/*
  /googleClientLogin API endpoint
  
   - This function handles user login via Google OAuth by verifying the provided Google credential.
   - It uses the verifyGoogleToken function to validate the Google token and extract user information.
   - If the user exists in the database, it updates their last login timestamp; if not, it creates a new user with the extracted information.
   - It then generates a JWT token for the user and returns it along with user details.
   - If the Google token is invalid or verification fails, it throws an error with a status code of 401 (Unauthorized).

*/

export const googleClientLogin = async (credential) => {
  const googleUser = await verifyGoogleToken(credential);

  const user = await User.findOneAndUpdate(
    { email: googleUser.email },
    {
      $set: {
        googleId: googleUser.googleId,
        name: googleUser.name,
        picture: googleUser.picture,
        lastLogin: new Date(),
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

/*
  /getUserProfile API endpoint
  - This function retrieves the profile information of a user based on their user ID.
  - It queries the database for the user and excludes sensitive fields like password and googleId from the returned object.
  - If the user is not found, it throws an error with a status code of 404 (Not Found).
  - If the user is found, it returns an object containing the user's ID, email, name, picture, creation date, and last login timestamp.
*/
export const getUserProfile = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID");
    error.status = 400;
    throw error;
  }

  const user = await User.findById(userId)
    .select("-password -__v -googleId")
    .lean();

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };

};
