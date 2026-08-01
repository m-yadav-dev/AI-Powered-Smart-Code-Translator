import { z } from "zod";
import { translationSchema } from "../validations/code.schema.js";
import { analyzeComplexitySchema } from "../validations/code.schema.js";
import { translateCode } from "../services/code-services/translation.service.js";
import { analyzeCodeComplexity } from "../services/code-services/complexity.service.js";
import { explainCode } from "../services/code-services/explanation.service.js";
import { createHistoryEntry } from "../services/history/history.service.js";
import { codeOptimization } from "../services/code-services/optimization.service.js";

const getZodErrorMessages = (validationError) =>
  (validationError?.issues || []).map((err) => err.message);
/*
    Implement the controller functions for code translation, complexity analysis, code explanation, and code optimization. Each function validates the request body using Zod schemas, calls the corresponding service function, saves the result to the history, and returns the result to the client. Error handling is included to catch any exceptions and pass them to the next middleware.

     - translateCode: Validates the request body for code translation, calls the translateCode service, saves the result to history, and returns the translated code.
     - analyzeComplexity: Validates the request body for complexity analysis, calls the analyzeCodeComplexity service, saves the result to history, and returns the complexity analysis.
     - explainCode: Validates the request body for code explanation, calls the explainCode service, saves the result to history, and returns the explanation.
     - optimizeCode: Validates the request body for code optimization, calls the codeOptimization service, saves the result to history, and returns the optimized code.
     
*/
export const translateSourceCode = async (req, res, next) => {
  console.log("Received request body for translation:", req.body);
  try {
    const validationResult = translationSchema.safeParse(req.body);


    console.log("Validation result data type:", validationResult.data);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: getZodErrorMessages(validationResult.error),
      });
    }

    // Extract validated data

    const { sourceCode, sourceLanguage, targetLanguage } = validationResult.data;

    const result = await translateCode(sourceCode, sourceLanguage, targetLanguage);
    console.log("Translation result:", result);
    // Save to History

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "translation",
      inputCode: sourceCode,
      sourceLanguage,
      targetLanguage,
      outputCode: JSON.stringify(result.translatedCode),
    }).catch((err) =>
      console.error("Failed to save history entry:", err.message),
    );

    return res.status(200).json({
      success: true,
      data: result.translatedCode,
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
        errors: getZodErrorMessages(validationResult.error),
      });
    }

    // Get the validated data

    const { sourceCode, sourceLanguage } = validationResult.data;

    const result = await analyzeCodeComplexity(sourceCode, sourceLanguage);

    // Save to History Schema

    const timeComplexityData = {
      explanation: result.explanation,
      timeComplexity: result.timeComplexity,
      spaceComplexity: result.spaceComplexity,
    }

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "complexity_analysis",
      inputCode: sourceCode,
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
        errors: getZodErrorMessages(validationResult.error),
      });
    }

    const { sourceCode, sourceLanguage } = validationResult.data;

    const result = await explainCode(sourceCode, sourceLanguage);
    console.log("Explanation result:", result);
    // Save to History Schema

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "code_explanation",
      inputCode: sourceCode,
      sourceLanguage,
      targetLanguage: "",   // null would fail Mongoose String validation — use empty string instead
      outputCode: JSON.stringify(result.explanation),
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
        errors: getZodErrorMessages(validationResult.error),
      });
    }

    const { sourceCode, sourceLanguage } = validationResult.data;

    const result = await codeOptimization(sourceCode, sourceLanguage);

    // Save to History Schema


    const optimizationData = {
      optimizedCode: result.optimizedCode,
      suggestions: result.suggestions,
    }

    createHistoryEntry({
      userId: req.user._id.toString(),
      action: "code_optimization",
      inputCode: sourceCode,
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
