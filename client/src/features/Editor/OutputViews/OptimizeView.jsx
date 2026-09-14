import CodeEditor from "../CodeEditor";

const OptimizeView = ({ result, targetLanguage }) => {
  console.log("Step 4: OptimizeView received result:", result?.optimizedCode);
  return (
    <div className="flex flex-col min-h-full w-full">
      {/* Monaco needs a definite `height` (not min-height) for height:"100%" to resolve */}
      <div className="w-full h-[400px]">
        <CodeEditor
          code={result?.optimizedCode || ""}
          readOnly={true}
          onChange={() => {}}
          language={targetLanguage || "javascript"}
        />
      </div>
      {result?.suggestions && (
        <div className="mt-4 p-4 border-t border-slate-700 rounded-md">
          <h3 className="font-semibold mb-2 text-slate-200">Suggestions</h3>
          <p className="text-gray-100 leading-relaxed">{result.suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default OptimizeView;
