import { Trash2 } from "lucide-react";

const HistoryHeader = () => {
  return (
    <header className="w-full bg-slate-700/80 border-b border-slate-600 rounded-2xl p-4 flex items-center justify-between">
      <div >
        <span className="text-lg font-semibold text-slate-200">History</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 border border-b  text-rose-500 font-medium hover:bg-rose-950/30 px-3 py-2 rounded-md transition-colors cursor-pointer">
          Clear All History 
          
          <Trash2 className="w-4 h-4" />
        </button>

        
      </div>
    </header>
  );
};

export default HistoryHeader;
