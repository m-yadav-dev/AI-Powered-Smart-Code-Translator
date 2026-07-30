import Editor from "@monaco-editor/react";
// import { CODE_EDITOR_LANGUAGES, STARTER_CODE } from "../../data/languages";

const CodeEditor = ({ language, onMount, theme, readOnly, code }) => {
  return (
    <Editor
      height="100%"
      language={language || "javascript"}
      value={code || ""}
      theme={theme || "vs-dark"}
      options={{
        fontSize: 16,
        fontFamily: "Fira Code, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        readOnly: readOnly || false,
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
      onMount={onMount}
      loading={
        <div className="loading text-2xl text-gray-750 font-[600]">
          Loading...
        </div>
      }
    />
  );
};

export default CodeEditor;
