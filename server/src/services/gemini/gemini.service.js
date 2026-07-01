import { ai, MODEL_NAME } from "../../config/gemini.config";
export const queryGemini = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    if (!response || !response.text) {
      throw new Error(
        "Received empty or invalid response structure from Gemini API",
      );
    }

    return response.text;
  } catch (error) {
    console.error(`[Gemini Service Error]: ${error.message}`);
    throw error;
  }
};
