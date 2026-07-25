import { Code2 } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center opacity-70">
      <Code2 className="mb-4 h-12 w-12 text-slate-500" />
      <p className="mb-2 text-lg font-medium text-slate-400">
        Awaiting Execution
      </p>
      <p className="max-w-xs text-center text-sm text-slate-500">
        Select your target language and run the translation to view the output.
      </p>
    </div>
  );
};

export default EmptyState;