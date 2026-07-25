import Editor from "@monaco-editor/react";
import { CODE_EDITOR_LANGUAGES, STARTER_CODE } from "../../data/languages";
import { useState } from "react";
const data = {
  code: STARTER_CODE.javascript,
  language: CODE_EDITOR_LANGUAGES.javascript,
};

const CodeEditor = () => {
  const [localCode, setLocalCode] = useState("");
  const onChangeLocalCode = (value) => {
    setLocalCode(value);
  };
  return (
    <Editor
      height="100%"
      language={data.language || "javascript"}
      value={localCode || ""}
      theme="vs-dark"
      onChange={onChangeLocalCode}
      options={{
        fontSize: 16,
        fontFamily: "Fira Code, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        readOnly: false,
        padding: { top: 10, bottom: 10 },
        automaticLayout: true,
        tabSize: 2,
        lineNumbers: "on",
        renderLineHighlight: "all",
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        matchBrackets: "always",
        formatOnPaste: true,
        autoFormat: true,

        suggestOnTriggerCharacters: true,
        folding: true,
        smoothScrolling: true,
        fixedOverflowWidgets: true,
      }}
      loading={
        <div className="loading text-2xl text-gray-750 font-[600]">
          Loading...
        </div>
      }
    />
  );
};

export default CodeEditor;
