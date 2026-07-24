
import  CodeEditor  from "../CodeEditor";

const TranslateView = ({ result }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <CodeEditor
          readOnly={true}
          code={result?.translatedCode || ""}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default TranslateView;
