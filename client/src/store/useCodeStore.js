import { create } from "zustand";
import { axiosInstance } from "../services/api";
export const useCodeStore = create((set) => ({
  isLoading: false,
  error: null,
  complexityData: null,
  translatedCode: "",
  timeComplexity: "",
  spaceComplexity: "",
  explanation: "",
  explanationData: null,
  sourceCode: "",
  codeOptimizationData: null,
  codeOptimization: "",
  suggestions: "",

  translateSourceCode: async (code, sourceLanguage, targetLanguage) => {
    set({ isLoading: true, sourceCode: code, error: null });
    try {
      const response = await axiosInstance.post("/code/translate-code", {
        sourceCode: code,
        sourceLanguage,
        targetLanguage,
      });
      console.log("Zustand Translation Response:", response.data);

      // Controller sends: res.json({ success: true, data: result.translatedCode })
      // Axios wraps it as: response.data = { success: true, data: "<string>" }
      // So the translated code string lives at response.data.data
      const finalResponse = response.data.data || "No translated code provided";
      set({ translatedCode: finalResponse });
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred during code translation.";

      if (error.response && error.response.status === 429) {
        errorMessage =
          error.response.data.error ||
          "Rate limit exceeded. Please try again later.";
      } else if (error.response && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      set({
        error: errorMessage,
        translatedCode: "",
        sourceCode: "",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  resetTranslatedCode: () =>
    set({
      sourceCode: "",
      translatedCode: "",
    }),

  analyzeCodeComplexity: async (code, sourceLanguage) => {
    set({ isLoading: true, sourceCode: code, error: null });
    try {
      const response = await axiosInstance.post("/code/analyze-complexity", {
        sourceCode: code, // ← was `code` — Zod schema expects `sourceCode`
        sourceLanguage,
      });
      console.log("Zustand Complexity Analysis Response:", response.data);
      set({
        complexityData: {
          timeComplexity: response.data.data.timeComplexity,
          spaceComplexity: response.data.data.spaceComplexity,
          explanation: response.data.data.explanation,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "An error occurred during complexity analysis.";
      console.error(`Zustand Complexity Analysis Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  explainCode: async (code, sourceLanguage) => {
    set({ isLoading: true, sourceCode: code, error: null });
    try {
      const response = await axiosInstance.post("/code/explain-code", {
        sourceCode: code, // ← was `code` — Zod schema expects `sourceCode`
        sourceLanguage,
      });

      console.log("Zustand Explain Code Response:", response.data);

      set({
        explanationData: {
          explanation: response.data.data.explanation,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "An error occurred during code explanation.";
      console.error(`Zustand Code Explanation Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  optimizeCode: async (code, sourceLanguage) => {
    set({ isLoading: true, sourceCode: code, error: null });
    try {
      const response = await axiosInstance.post("/code/optimize-code", {
        sourceCode: code,
        sourceLanguage,
      });
      set({
        codeOptimizationData: {
          optimizedCode: response.data.data.optimizedCode,
          suggestions: response.data.data.suggestions,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "An error occurred during code optimization.";
      console.error(`Zustand Code Optimization Error: ${errorMessage}`);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
