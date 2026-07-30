import dotenv from "dotenv";

dotenv.config();

import { createEnvironmentSchema } from "../validations/env.schema.js";

const parsedEnv = createEnvironmentSchema.safeParse(process.env);

export const ENV_VAR = {
  MONGO_URI: parsedEnv.success ? parsedEnv.data.MONGO_URI : undefined,
  PORT: parsedEnv.success ? parsedEnv.data.PORT : undefined,
  JWT_SECRET: parsedEnv.success ? parsedEnv.data.JWT_SECRET : undefined,
  JWT_EXPIRES_IN: parsedEnv.success ? parsedEnv.data.JWT_EXPIRES_IN : undefined,
  GOOGLE_CLIENT_ID: parsedEnv.success
    ? parsedEnv.data.GOOGLE_CLIENT_ID
    : undefined,
  GOOGLE_CLIENT_SECRET: parsedEnv.success
    ? parsedEnv.data.GOOGLE_CLIENT_SECRET
    : undefined,
  GEMINI_API_KEY: parsedEnv.success ? parsedEnv.data.GEMINI_API_KEY : undefined,
  CLIENT_URL: parsedEnv.success ? parsedEnv.data.CLIENT_URL : undefined,
  NODE_ENV: process.env.NODE_ENV || "development",
};


console.log(`Gemini API Key Length: ${ENV_VAR.GEMINI_API_KEY?.length}`);
