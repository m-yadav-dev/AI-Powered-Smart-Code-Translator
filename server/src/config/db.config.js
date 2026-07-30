import mongoose from "mongoose";
import { ENV_VAR } from "../utils/env.js";

const connectDB = async () => {
  try {
    const URI = ENV_VAR.MONGO_URI;
    if (!URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB successfully");
    console.log(
      `🟢 MongoDb Connected: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`,
    );
    console.log(`✨ MongoDB Version: ${mongoose.version}`);
    console.log(
      `🟢 MongoDB Connection State: ${mongoose.connection.readyState}`,
    
    console.log(`Database Name: ${mongoose.connection.name}`)

    );
    console.log(`MongoDB Connection Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
