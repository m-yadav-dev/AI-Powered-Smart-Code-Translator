export const parseGeminiResponseToJson = (text) => {
  try {
    let cleanedText = text.trim();

    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```(?:json)?\s*\n?/, "");
      cleanedText = cleanedText.replace(/\n?```\s*$/, "");
    }

    return JSON.parse(cleanedText.trim());
  } catch (error) {
    console.error("Error parsing Gemini response to JSON:", error);
    throw new Error("Failed to parse Gemini response to JSON.");
  }
};

export const cleanedCodeResponse = (text) => {
  let cleanedText = text.trim();

  if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.replace(/^```\w*\s*\n?/, "");
    cleanedText = cleanedText.replace(/\n?```\s*$/, "");
  }
  return cleanedText.trim();
};
















