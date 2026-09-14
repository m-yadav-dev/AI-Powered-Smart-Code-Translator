import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
const HistoryHeader = () => {
  return (
    <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
      <Link
        className="text-2xl font-semibold text-slate-100 text-decoration-none"
        to="/"
      >
        Code {" "}
        <span className="text-rose-400">History</span>
      </Link>

      <button className="flex items-center gap-2 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-2 rounded-lg border border-rose-500/20 hover:border-rose-500/40 transition-all duration-150 cursor-pointer">
        <Trash2 className="w-4 h-4" />
        Clear All
      </button>
    </header>
  );
};

export default HistoryHeader;
