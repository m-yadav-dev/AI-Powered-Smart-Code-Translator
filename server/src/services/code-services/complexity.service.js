import { queryGemini } from "../gemini/gemini.service.js";
import { ANALYZE_COMPLEXITY } from "../../constants/prompts.js";
import { parseGeminiResponseToJson } from "../../utils/prompts.utils.js";
import { getLanguagesName } from "../../constants/languages.js";

export const analyzeCodeComplexity = async (sourceCode, sourceLanguage) => {
  const languageName = getLanguagesName(sourceLanguage);

  const prompt = ANALYZE_COMPLEXITY(sourceCode, languageName);

  const rawResponse = await queryGemini(prompt);

  const responseJson = parseGeminiResponseToJson(rawResponse);

  return {
    timeComplexity:
      responseJson.timeComplexity || "No time complexity provided",
    spaceComplexity:
      responseJson.spaceComplexity || "No space complexity provided",
    explanation: responseJson.explanation || "No explanation provided",
  };

  return {
    timeComplexity: `Failed to clean Gemini response. Please check the raw response for details. Error: ${error.message}`,
    spaceComplexity: `Failed to clean Gemini response. Please check the raw response for details. Error: ${error.message}`,
    explanation: `Failed to clean Gemini response. Please check the raw response for details. Error: ${error.message}`,
  };
};
