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

export const EditorToolbar = ({
  activeAction,
  setActiveAction,
  isLoading,
  onExecute,
}) => {
  return (
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
        onClick={onExecute}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Execute Action"}
      </button>
    </section>
  );
};
