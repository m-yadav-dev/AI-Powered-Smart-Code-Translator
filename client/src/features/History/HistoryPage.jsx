import HistoryHeader from "./HistoryHeader";
import historyData from "../../data/historyData.js";
import HistoryCardItems from "./HistoryCardLists.jsx";
const HistoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto mb-6 w-full max-w-7xl">
        {/* // Header Section */}
        <section>
          <HistoryHeader />
        </section>

        {/* History Items Section */}
        <section className="mt-4">
          {historyData.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-6 py-8 text-center">
              <span className="text-lg font-semibold text-slate-300">
                No history available.
              </span>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {historyData.map((eachItem) => (
                <HistoryCardItems key={eachItem.id} {...eachItem} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default HistoryPage;
