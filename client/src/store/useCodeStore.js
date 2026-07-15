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

  translateSourceCode: async (code, sourceLanguage, targetLanguage) => {
    set({ isLoading: true, sourceCode: code, error: null });
    try {
      const response = await axiosInstance.post("/code/translate-code", {
        code,
        sourceLanguage,
        targetLanguage,
      });
      set({ translatedCode: response.data.data.translatedCode });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "An error occurred during code translation.";
      console.error(`Zustand Translation Error: ${errorMessage}`);
      set({ error: errorMessage });
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
        code,
        sourceLanguage,
      });
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
        code,
        sourceLanguage,
      });

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
        code,
        sourceLanguage,
      });

      set({
        codeOptimizationData: {
          codeOptimization: response.data.data.codeOptimization,
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
