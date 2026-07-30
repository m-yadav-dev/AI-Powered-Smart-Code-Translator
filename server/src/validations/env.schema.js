import z from "zod";

// Validate environment variables with clean API key and no extra spaces with irrelevant characters containing in the string. This is important for security and to avoid issues with API requests.
export const createEnvironmentSchema = z.object({
  MONGO_URI: z.string().min(1, "MONGO_URI is required").trim(),
  PORT: z.string().min(1, "PORT is required").trim(),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required").trim(),
  JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN is required").trim(),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required").trim(),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, "GOOGLE_CLIENT_SECRET is required")
    .trim(),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required").trim(),
  CLIENT_URL: z.string().min(1, "CLIENT_URL is required").trim(),
});
