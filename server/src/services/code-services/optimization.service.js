import { queryGemini } from "../gemini/gemini.service.js";
import { CODE_OPTIMIZATION } from "../../constants/prompts.js";
import { parseGeminiResponseToJson } from "../../utils/prompts.utils.js";
import { getLanguagesName } from "../../constants/languages.js";

export const codeOptimization = async (sourceCode, sourceLanguage) => {
  const getLanguageName = getLanguagesName(sourceLanguage);

  const prompt = CODE_OPTIMIZATION(sourceCode, getLanguageName);

  const rawResponse = await queryGemini(prompt);

  try {
    const responseJson = parseGeminiResponseToJson(rawResponse);

    return {
      optimizedCode:
        responseJson?.optimizedCode || "No optimized code provided",
      suggestions: responseJson?.suggestions || "No suggestions provided",
    };
  } catch (error) {
    console.error(
      `[Optimization Service Error]: Failed to parse Gemini response to JSON. Raw response: ${rawResponse}. Error: ${error.message}`,
    );

    return {
      optimizedCode: sourceCode,
      suggestions: `Failed to parse Gemini response to JSON. Please check the raw response for details. Error: ${error.message}`,
    };
  }
};



