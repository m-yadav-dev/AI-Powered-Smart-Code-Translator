import { useState } from "react";
import { useCodeStore } from "../../store/useCodeStore";
import AnalyzeView from "./OutputViews/AnalyzeView";
import ExplainView from "./OutputViews/ExplainView";
import OptimizeView from "./OutputViews/OptimizeView";
import TranslateView from "./OutputViews/TranslateView";

const VIEW_MAP = {
  translate: TranslateView,
  explain: ExplainView,
  optimize: OptimizeView,
  analyze: AnalyzeView,
};

const OutputPanel = ({ action, targetLanguage }) => {
  const [copy, setCopy] = useState(false);

  const translatedCode = useCodeStore((store) => store.translatedCode);
  const codeOptimization = useCodeStore((store) => store.codeOptimization);
  const explanation = useCodeStore((store) => store.explanationData);
  const complexityData = useCodeStore((store) => store.complexityData);

  let result = null;

  if (action === "translate") {
    result = translatedCode;
  } else if (action === "optimize") {
    result = codeOptimization;
  } else if (action === "explain") {
    result = explanation;
  } else if (action === "analyze") {
    result = complexityData;
  }

  const SelectedView = VIEW_MAP[action];

  if (!SelectedView) return null;

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-gray-500">No output available.</p>
      </div>
    );
  }

  const handleCopy = () => {
    let textToCopy = "";

    if (typeof result === "string") {
      textToCopy = result;
    } else if (typeof result === "object") {
      if (action === "analyze") {
        textToCopy = `Time Complexity: ${result?.timeComplexity || "N/A"}\nSpace Complexity: ${result?.spaceComplexity || "N/A"}\nExplanation: ${result?.explanation || "No explanation available."}`;
      } else {
        textToCopy = JSON.stringify(result, null, 2);
      }
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000); // Reset copy state after 2 seconds
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Universal Copy Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 absolute top-2 right-2"
        onClick={handleCopy}
      >
        {copy ? "Copied!" : "Copy Output"}
      </button>

      <SelectedView result={result} targetLanguage={targetLanguage} />
    </div>
  );
};

export default OutputPanel;
