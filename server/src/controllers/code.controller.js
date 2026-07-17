import { z } from "zod";
import { translationSchema } from "../validations/code.schema.js";
import { analyzeComplexitySchema } from "../validations/code.schema.js";
import { translateCode } from "../services/code-services/translation.service.js";
import { analyzeCodeComplexity } from "../services/code-services/complexity.service.js";
import { explainCode } from "../services/code-services/explanation.service.js";
import { createHistoryEntry } from "../services/history/history.service.js";
import { codeOptimization } from "../services/code-services/optimization.service.js";
/*
    Implement the controller functions for code translation, complexity analysis, code explanation, and code optimization. Each function validates the request body using Zod schemas, calls the corresponding service function, saves the result to the history, and returns the result to the client. Error handling is included to catch any exceptions and pass them to the next middleware.

     - translateCode: Validates the request body for code translation, calls the translateCode service, saves the result to history, and returns the translated code.
     - analyzeComplexity: Validates the request body for complexity analysis, calls the analyzeCodeComplexity service, saves the result to history, and returns the complexity analysis.
     - explainCode: Validates the request body for code explanation, calls the explainCode service, saves the result to history, and returns the explanation.
     - optimizeCode: Validates the request body for code optimization, calls the codeOptimization service, saves the result to history, and returns the optimized code.
     
*/
export const translateSourceCode = async (req, res, next) => {
  try {
    const validationResult = translationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors.map((err) => err.message),
      });
    }

    // Extract validated data

    const { code, sourceLanguage, targetLanguage } = validationResult.data;

    const result = await translateCode(code, sourceLanguage, targetLanguage);
    console.log("Translation result:", result);
    // Save to History

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "translation",
      inputCode: code,
      sourceLanguage,
      targetLanguage,
      outputCode: result.translatedCode,
    }).catch((err) =>
      console.error("Failed to save history entry:", err.message),
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeComplexity = async (req, res, next) => {
  try {
    const validationResult = analyzeComplexitySchema.safeParse(req.body);

    // If validation fails, return a 400 response with error details
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors.map((err) => err.message),
      });
    }

    // Get the validated data

    const { code, sourceLanguage } = validationResult.data;

    const result = await analyzeCodeComplexity(code, sourceLanguage);

    // Save to History Schema

    const timeComplexityData = {
      explanation: result.explanation,
      timeComplexity: result.timeComplexity,
      spaceComplexity: result.spaceComplexity,
    }

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "complexity_analysis",
      inputCode: code,
      sourceLanguage,
      outputCode: JSON.stringify(timeComplexityData),
    }).catch((error) =>
      console.error("Failed to save history entry:", error.message),
    );

    // Return the result to the client
    return res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const explainSourceCode = async (req, res, next) => {
  try {
    const validationResult = analyzeComplexitySchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors.map((err) => err.message),
      });
    }

    const { code, sourceLanguage } = validationResult.data;

    const result = await explainCode(code, sourceLanguage);

    // Save to History Schema

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "code_explanation",

      inputCode: code,
      sourceLanguage,
      outputCode: result.explanation,
    }).catch((error) =>
      console.error("Failed to save history entry:", error.message),
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const optimizeSourceCode = async (req, res, next) => {
  try {
    const validationResult = analyzeComplexitySchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors.map((err) => err.message),
      });
    }

    const { code, sourceLanguage } = validationResult.data;

    const result = await codeOptimization(code, sourceLanguage);

    // Save to History Schema


    const optimizationData = {
      optimizedCode: result.optimizedCode,
      suggestions: result.suggestions,
    }

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "code_optimization",
      inputCode: code,
      sourceLanguage,
      outputCode: JSON.stringify(optimizationData),
    }).catch((error) =>
      console.error("Failed to save history entry:", error.message),
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
