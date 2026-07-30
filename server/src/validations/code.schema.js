import { z } from "zod";

export const translationSchema = z.object({
  sourceCode: z.string().min(1, "Source code is required and cannot be empty."),
  sourceLanguage: z.string().min(1, "Source language is required."),
  targetLanguage: z.string().min(1, "Target language is required."),
});

export const analyzeComplexitySchema = z.object({
  sourceCode: z.string().min(1, "Source code is required and cannot be empty."),
  sourceLanguage: z.string().min(1, "Source language is required."),
});
