import mongoose from "mongoose";

/**
    - User Schema
    - This schema defines the structure of the User documents in the MongoDB collection.
    - Fields:
        {
        googleId: String (optional, unique) - The Google ID of the user for OAuth authentication.
        name: String (required) - The name of the user.
        email: String (required, unique) - The email address of the user.
        password: String (required) - The hashed password of the user.
        lastLogin: Date (default: current date) - The timestamp of the user's last login.
        }
 */

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Sparse allows multiple documents to have a null value for this field
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
