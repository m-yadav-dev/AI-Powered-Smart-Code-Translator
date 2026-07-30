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
  const translatedCode = useCodeStore((store) => store.translatedCode);
  const codeOptimization = useCodeStore((store) => store.codeOptimization);
  const explanation = useCodeStore((store) => store.explanationData);
  const complexityData = useCodeStore((store) => store.complexityData);

  let result = null;

  if (action === "translate") {
    result = translatedCode;
  } else if (action === "code_optimization") {
    result = codeOptimization;
  } else if (action === "code_explanation") {
    result = explanation;
  } else if (action === "complexity_analysis") {
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

  return (
    <div className="flex h-full w-full flex-col">
      <SelectedView result={result} targetLanguage={targetLanguage} />
    </div>
  );
};

export default OutputPanel;
