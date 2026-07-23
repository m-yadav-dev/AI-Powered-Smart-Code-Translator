import { ToggleLeft, ToggleRight } from "lucide-react";

const SwapButton = ({ activeAction, onSwap }) => {
  return (
    <div className="flex items-center justify-center">
      {activeAction === "translate" ? (
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          onClick={onSwap}
        >
          <ToggleRight className="w-5 h-5 mr-2" />
        </button>
      ) : (
        <span className="text-lg font-semibold text-gray-400">
          <ToggleLeft className="w-5 h-5 mr-2" />
        </span>
      )}
    </div>
  );
};

export default SwapButton;
