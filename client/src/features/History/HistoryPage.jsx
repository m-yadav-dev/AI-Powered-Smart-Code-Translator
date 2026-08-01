import { useState } from "react";
import HistoryHeader from "./HistoryHeader";
import { historyData } from "../../data/historyData.js";
import HistoryCardItems from "./HistoryCardLists.jsx";
const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState(historyData);
  const deleteHistoryItem = (id) => {
    const updatedHistoryItems = historyItems.filter((item) => item.id !== id);
    setHistoryItems(updatedHistoryItems);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto mb-6 w-full max-w-7xl">
        {/* // Header Section */}
        <section>
          <HistoryHeader />
        </section>

        {/* History Items Section */}
        <section className="mt-4">
          {historyItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-6 py-8 text-center">
              <span className="text-lg font-semibold text-slate-300">
                No history available.
              </span>
            </div>
          ) : (
            <ul className="w-full flex flex-col gap-3 max-w-4xl mx-auto">
              {historyItems.map((eachItem) => (
                <HistoryCardItems
                  key={eachItem.id}
                  {...eachItem}
                  onDelete={deleteHistoryItem}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default HistoryPage;
