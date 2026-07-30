export const parseGeminiResponseToJson = (responseData) => {
  try {
    let cleanedText = responseData.trim();

    cleanedText = cleanedText
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();

    const firstIndex = cleanedText.search(/[\{\[]/);
    const lastIndex = Math.max(
      cleanedText.lastIndexOf("}"),
      cleanedText.lastIndexOf("]"),
    );

    if (firstIndex === -1 || lastIndex === -1) {
      throw new Error("No JSON object found in the response.");
    }

    const jsonString = cleanedText.substring(firstIndex, lastIndex + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error(
      "=========== RAW TEXT FAILED TO PARSE ===========\n",
      responseData,
    );
    throw new Error(
      `Failed to parse Gemini response to JSON: ${error.message}`,
    );
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
