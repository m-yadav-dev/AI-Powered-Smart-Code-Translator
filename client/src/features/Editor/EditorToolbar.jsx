import { History, Loader2, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
  {
    id: "translate",
    label: "Translate Code",
  },
  {
    id: "analyze",
    label: "Analyze Code Complexity",
  },
  {
    id: "explain",
    label: "Explain Code",
  },
  {
    id: "optimize",
    label: "Optimize Code",
  },
];

export const EditorToolbar = ({
  activeAction,
  setActiveAction,
  isLoading,
  onExecute,
}) => {
  
  
  const navigate = useNavigate();
  
  return (
    <section className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-800 bg-slate-950/50 p-1">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeAction === action.id
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            }`}
            onClick={() => setActiveAction(action.id)}
          >
            {activeAction === action.id && <Sparkles className="h-4 w-4" />}
            {action.label}
          </button>
        ))}
        </div>

        <button
          type="button"
          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 font-medium text-white shadow-lg shadow-emerald-950/40 transition-all ${
            isLoading
              ? "cursor-not-allowed bg-emerald-700/60"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
          onClick={onExecute}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isLoading ? "Processing..." : "Execute Action"}
        </button>

        <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-800/80 px-5 py-2 font-medium text-slate-300 shadow-lg shadow-slate-950/40 transition-all hover:bg-slate-800 hover:text-indigo-400" onClick={() => navigate("/history")}>
          <History className="h-4 w-4" />
          View History
        </button>
      </div>
    </section>
  );
};
