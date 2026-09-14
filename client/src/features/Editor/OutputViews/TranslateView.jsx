import CodeEditor from "../CodeEditor";

const TranslateView = ({ result, targetLanguage }) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* Monaco needs a definite `height` (not min-height) for height:"100%" to resolve */}
      <div className="h-[400px] w-full">
        <CodeEditor
          readOnly={true}
          code={result || ""}
          onChange={() => {}}
          language={targetLanguage}
        />
      </div>
    </div>
  );
};

export default TranslateView;
