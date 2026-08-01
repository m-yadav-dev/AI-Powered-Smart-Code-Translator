const ExplainView = ({ result }) => {
  return (
    <div className="flex flex-col min-h-full w-full">
      <p className="text-gray-100 leading-[1.5rem] my-4 p-6">
        {result?.explanation || "No explanation available."}
      </p>
    </div>
  );
};

export default ExplainView;
