
/*
    /server.js
    - This file serves as the entry point for the Express server.
    - It imports the Express app from src/app.js and the database connection function from src/config/db.config.js.
    - The server is started by first connecting to the MongoDB database and then listening on the specified port.
    - Error handling is implemented to catch any issues during database connection or server startup, logging the errors and exiting the process if necessary.
    - The server listens on a port defined in environment variables or defaults to 5000, and logs a message when it starts successfully.
*/

import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";
import { ENV_VAR } from "./src/utils/env.js";

const PORT = ENV_VAR.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();


