import { queryGemini } from "../gemini/gemini.service.js";
import { TRANSLATE_PROMPT } from "../../constants/prompts.js";
import { cleanedCodeResponse } from "../../utils/prompts.utils.js";
import { getLanguagesName } from "../../constants/languages.js";

export const translateCode = async (
  sourceCode,
  sourceLanguage,
  targetLanguage,
) => {
  const sourceLanguageName = getLanguagesName(sourceLanguage);
  const targetLanguageName = getLanguagesName(targetLanguage);

  const prompt = TRANSLATE_PROMPT(
    sourceCode,
    sourceLanguageName,
    targetLanguageName,
  );

  const rawResponse = await queryGemini(prompt);

  try {
    const cleanedResponse = cleanedCodeResponse(rawResponse);

    return {
      translatedCode: cleanedResponse || "No translated code provided",
      sourceLanguage: sourceLanguageName,
      targetLanguage: targetLanguageName,
    };
  } catch (error) {
    console.error(
      `[Translation Service Error]: Failed to clean Gemini response. Raw response: ${rawResponse}. Error: ${error.message}`,
    );

    return {
      translatedCode: `Failed to clean Gemini response. Please check the raw response for details. Error: ${error.message}`,
      sourceLanguage: sourceLanguageName,
      targetLanguage: targetLanguageName,
    };
  }
};
