const ExplainView = ({ result }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <p className="text-gray-600">
        {result?.explanation || "No explanation available."}
      </p>
    </div>
  );
};

export default ExplainView;
