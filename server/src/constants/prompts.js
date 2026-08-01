export const TRANSLATE_PROMPT = (
  sourceCode,
  sourceLanguage,
  targetLanguage,
) => `
You are an expert software engineer. Translate the following ${sourceLanguage} code into ${targetLanguage}.

RULES:
1. Provide the absolute best, most optimized code.
2. DO NOT include any conversational text, explanations, or markdown blocks outside the JSON.
3. You MUST return ONLY a valid JSON object using the exact structure below.

EXPECTED JSON FORMAT:
{
  "translatedCode": "<your_translated_code_here>"
}

CODE TO TRANSLATE:
${sourceCode}

`;

export const ANALYZE_COMPLEXITY = (sourceCode, sourceLanguage) => `
You are an expert software engineer. Analyze the time and space complexity of the following ${sourceLanguage} code.

RULES:
1. Analyze the algorithm thoroughly and accurately.
2. DO NOT include any conversational text, explanations outside the JSON, or markdown blocks.
3. You MUST return ONLY a valid JSON object using the exact structure below.

EXPECTED JSON FORMAT:
{
  "timeComplexity": "<e.g. O(n log n)>",
  "spaceComplexity": "<e.g. O(n)>",
  "explanation": "<a clear, concise explanation of why the code has this complexity>"
}

CODE TO ANALYZE:
${sourceCode}

`;

export const CODE_OPTIMIZATION = (sourceCode, sourceLanguage) => `

You are an expert software engineer. Optimize the following ${sourceLanguage} code for better performance and readability.

RULES:
1. Provide the absolute best, most optimized code.
2. DO NOT include any conversational text, explanations, or markdown blocks outside the JSON.
3. You MUST return ONLY a valid JSON object using the exact structure below.

EXPECTED JSON FORMAT:
{
  "optimizedCode": "<your_optimized_code_here>",
  "suggestions": "<your_suggestions_here>"
}

CODE TO OPTIMIZE:
${sourceCode}

`;

export const EXPLAIN_CODE = (sourceCode, sourceLanguage) => `
  You are an expert software engineer. Explain the following ${sourceLanguage} code in a beginner-friendly way.

RULES:
1. Provide the absolute best explanation.
2. DO NOT include any conversational text, explanations, or markdown blocks outside the JSON.
3. You MUST return ONLY a valid JSON object using the exact structure below.

EXPECTED JSON FORMAT:
{
  "explanation": "your detailed explanation here"
}

CODE TO EXPLAIN:
${sourceCode}
`;
