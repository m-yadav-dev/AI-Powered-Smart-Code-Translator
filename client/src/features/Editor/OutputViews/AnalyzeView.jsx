import InfoCard from "../../../components/common/InfoCard";

const AnalyzeView = ({ result }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row gap-4">
        <InfoCard label="Time" value={result?.timeComplexity || "N/A"} />
        <InfoCard label="Space" value={result?.spaceComplexity || "N/A"} />
      </div>
      {result?.explanation && (
        <p className="text-gray-600">{result.explanation}</p>
      )}
    </div>
  );
};

export default AnalyzeView;
