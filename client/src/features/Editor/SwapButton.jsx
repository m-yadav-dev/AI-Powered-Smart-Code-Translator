import { ArrowLeftRight } from "lucide-react";

const SwapButton = ({ activeAction, onSwap }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={onSwap}
        className={`flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 p-3 text-slate-300 shadow-xl transition-all duration-300 hover:rotate-180 hover:scale-110 hover:border-indigo-500 hover:bg-slate-800 hover:text-indigo-400 ${
          activeAction !== "translate"
            ? "pointer-events-none opacity-30"
            : ""
        }`}
        aria-label="Swap source and target languages"
        disabled={activeAction !== "translate"}
      >
        <ArrowLeftRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SwapButton;
