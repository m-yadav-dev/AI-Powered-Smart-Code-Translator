import LanguageSelector from "../../components/common/LanguageSelector";
import { STARTER_CODE } from "../../data/languages";
import CodeEditor from "./CodeEditor";

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
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Source Code</h2>
        <LanguageSelector
          value={sourceLanguage}
          onChange={handleSourceLanguageChange}
        />
      </div>

      {/* Code Editor Component */}
      <div className="mt-4 flex-1 min-h-[300px] border border-gray-300 rounded-md overflow-hidden">
        <CodeEditor
          language={sourceLanguage}
          onMount={(editor) => (editorRef.current = editor)}
        />
      </div>

      {/* Clear Editor Button */}

      <button
        className="mt-4 px-4 py-2 rounded-md bg-transparent text-gray-900 border border-red-600 border-2 hover:bg-red-600 hover:text-white transition-colors duration-300"
        onClick={onClearEditor}
      >
        Clear
      </button>
    </div>
  );
};

export default SourcePanel;
