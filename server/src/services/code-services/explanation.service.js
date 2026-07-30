import { queryGemini } from "../gemini/gemini.service.js";
import { EXPLAIN_CODE } from "../../constants/prompts.js";
import { parseGeminiResponseToJson } from "../../utils/prompts.utils.js";
import { getLanguagesName } from "../../constants/languages.js";
export const explainCode = async (sourceCode, sourceLanguage) => {
  // Prepare the prompt for Gemini AI

  const languageName = getLanguagesName(sourceLanguage);

  const prompt = EXPLAIN_CODE(sourceCode, languageName);

  // Fetch the response from Gemini AI
  const rawResponse = await queryGemini(prompt);

  // Parse String to Object using Zod schema
  const responseJson = parseGeminiResponseToJson(rawResponse);

  return {
    explanation: responseJson?.explanation || "No explanation provided",
  };

  return {
    explanation: `Failed to clean Gemini response. Please check the raw response for details. Error: ${error.message}`,
  };
};
