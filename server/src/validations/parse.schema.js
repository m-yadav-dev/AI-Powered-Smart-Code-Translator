import z from "zod";

// Schema for "Explain Code" functionality

export const explainCodeSchema = z.object({
  explanation: z.string({
    required_error: "Explanation text is missing or not a string.",
    invalid_type_error: "Explanation must be a string.",
  }),
  

});

export const translateCodeSchema = z.object({
  translatedCode: z.string({
    required_error: "Translated code is missing or not a string.",
    invalid_type_error: "Translated code must be a string.",
  }), 
});

export const analyzeComplexitySchema = z.object({
  timeComplexity: z.string({
    required_error: "Time complexity is missing or not a string.",
  }),
  spaceComplexity: z.string({
    required_error: "Space complexity is missing or not a string.",
  }),
  explanation: z.string().optional(),
});

export const optimizeCodeSchema = z.object({
  optimizedCode: z.string({
    required_error: "Optimized code is missing or not a string.",
  }),
  suggestions: z.string({
    required_error: "Suggestions are missing or not a string.",
  }),
});
