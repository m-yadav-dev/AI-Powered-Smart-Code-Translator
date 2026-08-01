import { queryGemini } from "../gemini/gemini.service.js";
import { TRANSLATE_PROMPT } from "../../constants/prompts.js";
import { parseGeminiResponseToJson } from "../../utils/prompts.utils.js";
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

  // Gemini returns a JSON object: { "translatedCode": "..." }
  // parseGeminiResponseToJson strips fences AND parses the JSON so we
  // can extract the .translatedCode string directly.
  const parsed = parseGeminiResponseToJson(rawResponse);
  const translatedCode = parsed.translatedCode || "No translated code provided";

  return {
    translatedCode,
    sourceLanguage: sourceLanguageName,
    targetLanguage: targetLanguageName,
  };

};
