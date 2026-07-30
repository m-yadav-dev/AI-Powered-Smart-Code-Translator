import InfoCard from "../../../components/common/InfoCard";

const AnalyzeView = ({ result }) => {
  return (
    <div className="flex flex-col h-full w-full p-6">
      <div className="flex flex-row gap-4 justify-center">
        <InfoCard label="Time" value={result?.timeComplexity || "N/A"} />
        <InfoCard label="Space" value={result?.spaceComplexity || "N/A"} />
      </div>
      {result?.explanation && (
        <p className="text-white leading-[1.5rem] my-4">{result.explanation}</p>
      )}
    </div>
  );
};

export default AnalyzeView;
