import { useMemo, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { useCodeStore } from "../../store/useCodeStore";
import LanguageSelector from "../../components/common/LanguageSelector";
import EmptyState from "./EmptyState";
import OutputPanel from "./OutputPanel";

const CodeOutputViewer = ({
  action,
  targetLanguage,
  setTargetLanguage,
  isLoading,
}) => {
  const [copied, setCopied] = useState(false);

  const translatedCode = useCodeStore((store) => store.translatedCode);
  const codeOptimizationData = useCodeStore(
    (store) => store.codeOptimizationData,
  );
  const explanation = useCodeStore((store) => store.explanationData);
  const complexityData = useCodeStore((store) => store.complexityData);
  const error = useCodeStore((store) => store.error);

  const result = useMemo(() => {
    if (action === "translate") {
      return translatedCode;
    }

    if (action === "optimize") {
      return codeOptimizationData;
    }

    if (action === "explain") {
      return explanation;
    }

    if (action === "analyze") {
      return complexityData;
    }

    return null;
  }, [
    action,
    codeOptimizationData,
    complexityData,
    explanation,
    translatedCode,
  ]);

  const copyText = useMemo(() => {
    if (!result) {
      return "";
    }

    if (typeof result === "string") {
      return result;
    }

    if (action === "analyze") {
      return `Time Complexity: ${result?.timeComplexity || "N/A"}\nSpace Complexity: ${result?.spaceComplexity || "N/A"}\nExplanation: ${result?.explanation || "No explanation available."}`;
    }

    if (action === "explain") {
      return result?.explanation || "";
    }

    if (action === "optimize") {
      return result?.optimizedCode || "";
    }

    if (action === "translate") {
      return result?.translatedCode || "";
    }

    return JSON.stringify(result, null, 2);
  }, [action, result]);

  const handleCopyOutput = async () => {
    if (!copyText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-125 h-[65vh] bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between pb-3 text-sm font-semibold text-slate-300">
        <div className="flex items-center gap-3">
          <h2 className="tracking-tight">
            {action === "translate" ? "Target Code" : "Output"}
          </h2>

          {action === "translate" ? (
            <LanguageSelector
              value={targetLanguage}
              onChange={(event) => setTargetLanguage(event.target.value)}
            />
          ) : (
            <span className="rounded-full border border-indigo-800/50 bg-indigo-950 px-2.5 py-1 text-xs font-medium text-indigo-300">
              {action}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopyOutput}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy Output"}
        </button>
      </div>

      <div className="output-scroll flex-1 w-full relative mt-3 overflow-y-auto rounded-lg border border-slate-800 bg-[#1e1e1e]">
        {!isLoading && !result ? (
          <EmptyState />
        ) : (
          <OutputPanel
            action={action}
            targetLanguage={action === "translate" ? targetLanguage : null}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-5 py-4 shadow-2xl shadow-slate-950/50">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
              <p className="text-xs font-medium tracking-wide text-slate-300">
                Processing output...
              </p>
            </div>
            {!isLoading && error && (
              <div className="flex-1 p-4 bg-red-50 border border-red-400 rounded-md text-red-700">
                <h3 className="font-bold">Execution Failed</h3>
                <p>{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeOutputViewer;
