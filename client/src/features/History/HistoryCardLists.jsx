import {
  ChevronRight,
  MoveRight,
  BookOpen,
  Zap,
  BarChart2,
  Trash2,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns a human-readable timestamp: "Oct 10, 2023 • 10:00 AM" */
const formatTimestamp = (raw) => {
  const date = new Date(raw);
  if (isNaN(date)) return raw;

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} • ${timePart}`;
};

/** Returns a badge config { label, colorClasses, Icon } for each action type */
const getActionMeta = (action) => {
  switch (action) {
    case "translation":
      return {
        label: "Translation",
        colorClasses: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
        Icon: MoveRight,
      };
    case "code_explanation":
      return {
        label: "Explanation",
        colorClasses:
          "bg-violet-500/10 text-violet-400 border border-violet-500/20",
        Icon: BookOpen,
      };
    case "code_optimization":
      return {
        label: "Optimization",
        colorClasses:
          "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        Icon: Zap,
      };
    case "complexity_analysis":
      return {
        label: "Complexity",
        colorClasses:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        Icon: BarChart2,
      };
    default:
      return {
        label: action,
        colorClasses: "bg-slate-700/40 text-slate-400 border border-slate-700",
        Icon: MoveRight,
      };
  }
};

/** Builds the main descriptive text shown in the card title area */
const buildActionText = (action, sourceLanguage, targetLanguage) => {
  switch (action) {
    case "translation":
      return { primary: sourceLanguage, secondary: targetLanguage };
    case "code_explanation":
      return { primary: sourceLanguage, secondary: null };
    case "code_optimization":
      return { primary: sourceLanguage, secondary: null };
    case "complexity_analysis":
      return { primary: sourceLanguage, secondary: null };
    default:
      return { primary: sourceLanguage || targetLanguage, secondary: null };
  }
};

// ─── Component ──────────────────────────────────────────────────────────────

const HistoryCardItems = ({
  id,
  sourceLanguage,
  targetLanguage,
  action,
  timestamp,
  onDelete,
}) => {
  const { label, colorClasses, Icon } = getActionMeta(action);
  const { primary, secondary } = buildActionText(
    action,
    sourceLanguage,
    targetLanguage,
  );

  return (
    <li className="group flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:border-slate-600 cursor-pointer mb-3">
      {/* ── Left: badge + title + timestamp ── */}
      <div className="flex items-start gap-3 min-w-0">
        {/* Action type pill */}
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium shrink-0 ${colorClasses}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>

        {/* Text block */}
        <div className="flex flex-col gap-1 min-w-0">
          {/* Primary → Secondary language (or just primary) */}
          <span className="text-slate-200 font-medium leading-snug truncate">
            {primary}
            {secondary && (
              <>
                <MoveRight className="h-4 w-4 inline-block mx-1.5 text-slate-500" />
                {secondary}
              </>
            )}
          </span>

          {/* Human-readable timestamp */}
          <span className="text-sm text-slate-500 mt-1">
            {formatTimestamp(timestamp)}
          </span>
        </div>
      </div>

      {/* ── Right: action icons ── */}
      <div className="flex items-center gap-1 shrink-0 ml-4">
        {/* Delete — hidden until hover */}
        <button
          aria-label="Delete entry"
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all duration-150 p-2 rounded-lg hover:bg-rose-500/10 cursor-pointer"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>

        {/* View affordance — always visible, turns cyan on hover */}
        <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-150" />
      </div>
    </li>
  );
};

export default HistoryCardItems;
