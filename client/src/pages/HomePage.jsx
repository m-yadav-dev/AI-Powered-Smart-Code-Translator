import { useState, useRef, useEffect } from "react";
import { STARTER_CODE } from "../data/languages";
import { useCodeStore } from "../store/useCodeStore";
import { toast } from "react-hot-toast";

// Importing  modular components
import OutputPanel from "../features/Editor/OutputPanel";
import { EditorToolbar } from "../features/Editor/EditorToolbar";
import SourcePanel from "../features/Editor/SourcePanel";
import SwapButton from "../features/Editor/SwapButton";

const Home = () => {
  const [targetLanguage, setTargetLanguage] = useState("javascript");
  const [sourceLanguage, setSourceLanguage] = useState("python");
  const [activeAction, setActiveAction] = useState("translate");
  // const [copied, setCopied] = useState(false);

  const editorRef = useRef(null);

  const isLoading = useCodeStore((store) => store.isLoading);

  const error = useCodeStore((store) => store.error);

  const translateSourceCode = useCodeStore(
    (store) => store.translateSourceCode,
  );
  const analyzeCodeComplexity = useCodeStore(
    (store) => store.analyzeCodeComplexity,
  );
  const explainCode = useCodeStore((store) => store.explainCode);

  const optimizeCode = useCodeStore((store) => store.optimizeCode);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle the execution of the selected action based on the activeAction state
  const onClickExecuteAction = async () => {
    if (!editorRef.current) {
      toast.error("Editor is not ready yet.");
      return;
    }
    const code = editorRef.current.getValue();

    if (!code.trim()) {
      toast.error("Please enter some code to process.");
      return;
    }
    if (activeAction === "translate" && !targetLanguage.trim()) {
      toast.error("Please select a target language for translation.");
      return;
    }

    if (activeAction === "translate") {
      await translateSourceCode(code, sourceLanguage, targetLanguage);
    } else if (activeAction === "analyze") {
      await analyzeCodeComplexity(code, sourceLanguage);
    } else if (activeAction === "optimize") {
      await optimizeCode(code, sourceLanguage);
    } else if (activeAction === "explain") {
      await explainCode(code, sourceLanguage);
    }
  };



  const handleSwap = () => {
    if (activeAction !== "translate") {
      toast.error("Swap is only available for the Translate action.");
      return;
    }
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);

    if (STARTER_CODE[targetLanguage] && editorRef.current) {
      editorRef.current.setValue(STARTER_CODE[targetLanguage]);
    }
  };

  const handleClearEditor = () => {
    if (editorRef.current) {
      editorRef.current.setValue("");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Toolbar */}

      <EditorToolbar
        activeAction={activeAction}
        setActiveAction={setActiveAction}
        isLoading={isLoading}
        onExecute={onClickExecuteAction}
      />

      {/* Editor: Source and Output */}

      <section className="w-full max-w-4xl p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Source Code Editor */}

          <SourcePanel
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            editorRef={editorRef}
            onClearEditor={handleClearEditor}
          />
          {/* Middle Swap Button */}

          <SwapButton activeAction={activeAction} onSwap={handleSwap} />

          {/* Output Panel */}
          <OutputPanel
            action={activeAction}
            targetLanguage={
              activeAction === "translate" ? targetLanguage : null
            }
            setTargetLanguage={setTargetLanguage}
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
