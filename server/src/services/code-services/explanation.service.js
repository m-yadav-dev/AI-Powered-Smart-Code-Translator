import { queryGemini } from "../gemini/gemini.service.js";
import { EXPLAIN_CODE } from "../../constants/prompts.js";
import { parseGeminiResponseToJson } from "../../utils/prompts.utils.js";
import { getLanguagesName } from "../../constants/languages.js";

export const explainCode = async (sourceCode, sourceLanguage) => {
  const languageName = getLanguagesName(sourceLanguage);

  const prompt = EXPLAIN_CODE(sourceCode, languageName);

  const rawResponse = await queryGemini(prompt);

  try {
    const responseJson = parseGeminiResponseToJson(rawResponse);

    return {
      explanation: responseJson?.explanation || "No explanation provided",
    };
  } catch (error) {
    console.error(
      `[Explanation Service Error]: Failed to parse Gemini response to JSON. Raw response: ${rawResponse}. Error: ${error.message}`,
    );

    return {
      explanation:
        "Failed to parse Gemini response to JSON. Please check the raw response for details.",
    };
  }
};
