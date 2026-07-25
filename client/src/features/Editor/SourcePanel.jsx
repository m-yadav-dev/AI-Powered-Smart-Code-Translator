import LanguageSelector from "../../components/common/LanguageSelector";
import { STARTER_CODE } from "../../data/languages";
import CodeEditor from "./CodeEditor";
import { RotateCcw } from "lucide-react";

const SourcePanel = ({
  sourceLanguage,
  setSourceLanguage,
  editorRef,
  onClearEditor,
}) => {
  const handleSourceLanguageChange = (selectorId) => {
    setSourceLanguage(selectorId);
    if (STARTER_CODE[selectorId] && editorRef.current) {
      editorRef.current.setValue(STARTER_CODE[selectorId]);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-125 h-[65vh] bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between pb-3 text-sm font-semibold text-slate-300">
        <h2 className="tracking-tight">Source Code</h2>
        <div className="flex items-center gap-3">
          <LanguageSelector
            value={sourceLanguage}
            onChange={handleSourceLanguageChange}
          />
          <button
            type="button"
            className="cursor-pointer text-sm flex items-center gap-1 text-rose-500 border border-rose-500 border-1 rounded-md p-1 transition-colors hover:text-rose-600 hover:border-rose-600"
            onClick={onClearEditor}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear editor
          </button>
        </div>
      </div>

      {/* Code Editor Component */}
      <div className="flex-1 w-full relative mt-3 overflow-hidden rounded-lg border border-slate-800 bg-[#1e1e1e] shadow-inner">
        <CodeEditor
          language={sourceLanguage}
          onMount={(editor) => (editorRef.current = editor)}
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default SourcePanel;
