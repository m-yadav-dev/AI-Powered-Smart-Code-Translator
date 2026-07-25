import { useState, useRef, useEffect } from "react";
import { STARTER_CODE } from "../data/languages";
import { useCodeStore } from "../store/useCodeStore";
import { toast } from "react-hot-toast";

// Importing  modular components

import { EditorToolbar } from "../features/Editor/EditorToolbar";
import SourcePanel from "../features/Editor/SourcePanel";
import SwapButton from "../features/Editor/SwapButton";
import CodeOutputViewer from "../features/Editor/CodeOutputViewer";

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
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      {/* Toolbar */}

      <div className="mx-auto mb-6 w-full max-w-7xl">
        <EditorToolbar
          activeAction={activeAction}
          setActiveAction={setActiveAction}
          isLoading={isLoading}
          onExecute={onClickExecuteAction}
        />
      </div>

      {/* Editor: Source and Output */}

      <section className="mx-auto w-full max-w-7xl rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-stretch">
          {/* Source Code Editor */}

          <div className="w-full flex-1">
            <SourcePanel
              sourceLanguage={sourceLanguage}
              setSourceLanguage={setSourceLanguage}
              editorRef={editorRef}
              onClearEditor={handleClearEditor}
            />
          </div>
          {/* Middle Swap Button */}

          <div className="flex items-center justify-center py-1 lg:self-center lg:py-0">
            <SwapButton activeAction={activeAction} onSwap={handleSwap} />
          </div>

          {/* Output Panel */}
          <div className="w-full flex-1">
            <CodeOutputViewer
              action={activeAction}
              targetLanguage={
                activeAction === "translate" ? targetLanguage : null
              }
              setTargetLanguage={setTargetLanguage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
