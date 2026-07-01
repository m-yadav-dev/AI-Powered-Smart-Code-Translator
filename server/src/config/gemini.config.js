import { GoogleGenAI } from "@google/genai";
import { ENV_VAR } from "../utils/env";

export const ai = new GoogleGenAI({
  apiKey: ENV_VAR.GEMINI_API_KEY,
});

export const MODEL_NAME = "gemini-2.5-flash";


