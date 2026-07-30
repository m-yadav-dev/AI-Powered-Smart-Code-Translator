import CodeEditor from "../CodeEditor";

const TranslateView = ({ result, targetLanguage }) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex flex-row gap-4 h-full w-full min-h-[400px]">
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
