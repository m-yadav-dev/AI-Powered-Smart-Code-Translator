import CodeEditor from "../CodeEditor";

const OptimizeView = ({ result, targetLanguage }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row gap-4">
        <CodeEditor
          code={result?.codeOptimization || ""}
          readOnly={true}
          onChange={() => {}}
          language={targetLanguage || "javascript"}
        />
      </div>
      {result?.suggestions && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Suggestions</h3>
          <p className="text-gray-600">{result.suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default OptimizeView;
