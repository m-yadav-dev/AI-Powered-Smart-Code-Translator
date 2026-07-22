import { useState, useRef, useEffect } from "react";
import { STARTER_CODE } from "../data/languages";
import { useCodeStore } from "../store/useCodeStore";
import { toast } from "react-hot-toast";
import { LanguageSelector } from "../components/common/LanguageSelector";
import { ToggleLeft, ToggleRight } from "lucide-react";

const ACTIONS = [
  {
    id: "translate",
    label: "Translate Code",
  },
  {
    id: "analyze",
    label: "Analyze Code Complexity",
  },
  {
    id: "explain",
    label: "Explain Code",
  },
  {
    id: "optimize",
    label: "Optimize Code",
  },
];

const Home = () => {
  const [targetLanguage, setTargetLanguage] = useState("javascript");
  const [sourceLanguage, setSourceLanguage] = useState("python");
  const [activeAction, setActiveAction] = useState("translate");
  // const [copied, setCopied] = useState(false);

  const editorRef = useRef(null);

  // const {
  //   isLoading,
  //   translateSourceCode,
  //   analyzeCodeComplexity,
  //   optimizeCode,
  //   explainCode,
  //   error,
  // } = useCodeStore();

  const isLoading = useCodeStore((store) => store.isLoading);

  const error = useCodeStore((store) => store.error);

  const translateSourceCode = useCodeStore(
    (store) => store.translateSourceCode,
  );

  const analyzeCodeComplexity = useCodeStore(
    (store) => store.analyzeCodeComplexity,
  );

  const optimizeCode = useCodeStore((store) => store.optimizeCode);

  const explainCode = useCodeStore((store) => store.explainCode);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // const handleEditorChange = (value) => {
  //   if (editorRef.current) {
  //     editorRef.current.setValue(value);
  //   }
  // };

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

  const handleSourceLanguageChange = (selectorId) => {
    setSourceLanguage(selectorId);

    if (STARTER_CODE[selectorId] && editorRef.current) {
      editorRef.current.setValue(STARTER_CODE[selectorId]);
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
      <section className="w-full max-w-4xl p-4 bg-white shadow-md rounded-md mb-4">
        <div className="flex flex-wrap gap-2">
          {ACTIONS.map((action) => (
            <button
              key={action.id}
              className={`px-4 py-2 rounded-md ${
                activeAction === action.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveAction(action.id)}
            >
              {action.label}
            </button>
          ))}
        </div>
        <button
          className={`mt-4 px-4 py-2 rounded-md ${
            isLoading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={onClickExecuteAction}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Execute Action"}
        </button>
      </section>

      {/* Editor: Source and Output */}

      <section className="w-full max-w-4xl p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="panel-header">
              <h2 className="text-lg font-semibold">Source Code</h2>
              <LanguageSelector
                value={sourceLanguage}
                onChange={handleSourceLanguageChange}
              />
            </div>
            <button
              className="mt-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={handleClearEditor}
            >
              Clear
            </button>
          </div>
          <div className="flex-1">
            {activeAction === "translate" ? (
              <button
                className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSwap}
              >
                <ToggleRight className="mr-2" />
              </button>
            ) : (
              <span className="text-lg font-semibold">
                <ToggleLeft className="mr-2" />
              </span>
            )}
          </div>

          {/* Output Panel */}

          <div className="flex-1">
            <div className="panel-header">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {activeAction === "translate" ? "Target Code" : "Output"}
                </h2>
                {activeAction === "translate" && (
                  <LanguageSelector
                    value={targetLanguage}
                    onChange={setTargetLanguage}
                  />
                )}

                {  activeAction !== "translate" && (
                  <span className="text-lg font-semibold">{activeAction}</span>
                )}
              </div>

                
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
