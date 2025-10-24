import React from "react";
const HistoryPanel = ({ onItinerarySelect, historyItems, isLoading }) => {

  const formatDate = (dateString) => {
    if (!dateString) return "Date not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="lg:col-span-1 lg:sticky top-6 h-fit">
      <div
        className="bg-[#0f1111] border border-gray-800 rounded-2xl p-6 shadow-lg"
        style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}
      >
        <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
          History
        </h3>
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="text-center p-4 text-gray-500">Loading...</div>
          ) : historyItems.length > 0 ? (
            historyItems.map((item) => (
              <div
                key={item._id}
                className="p-3 rounded-lg border border-gray-800 bg-[#0b0d0d] hover:bg-gray-800/50 hover:border-blue-500/30 cursor-pointer transition-all"
                onClick={() => onItinerarySelect(item.content)}
              >
                <h4 className="font-semibold text-blue-400 text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Saved: {formatDate(item.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500 italic text-sm">
              No saved itineraries yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;