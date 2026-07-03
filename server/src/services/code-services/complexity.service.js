import { queryGemini } from "../gemini/gemini.service.js";
import { ANALYZE_COMPLEXITY } from "../../constants/prompts.js";
import { parseGeminiResponseToJson } from "../../utils/prompts.utils.js";
import { getLanguagesName } from "../../constants/languages.js";

export const analyzeCodeComplexity = async (sourceCode, sourceLanguage) => {
  const languageName = getLanguagesName(sourceLanguage);

  const prompt = ANALYZE_COMPLEXITY(sourceCode, languageName);

  const rawResponse = await queryGemini(prompt);

  try {
    const responseJson = parseGeminiResponseToJson(rawResponse);

    return {
      timeComplexity:
        responseJson?.timeComplexity || "No time complexity provided",
      spaceComplexity:
        responseJson?.spaceComplexity || "No space complexity provided",
      explanation: responseJson?.explanation || "No explanation provided",
    };
  } catch (error) {
    console.error(
      `[Complexity Service Error]: Failed to parse Gemini response to JSON. Raw response: ${rawResponse}. Error: ${error.message}`,
    );

    return {
      timeComplexity: "Error parsing time complexity",
      spaceComplexity: "Error parsing space complexity",
      explanation:
        "Failed to parse Gemini response to JSON. Please check the raw response for details.",
    };
  }
};


