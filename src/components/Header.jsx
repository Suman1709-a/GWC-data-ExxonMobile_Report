import React from "react";

function Header() {//{handleWeekTabClick,handleTodayTabClick,activeTab}


  return (
    <div className="text-left flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {/* On Deck {activeTab === "today" ? "Today" : "This Week"} */}
          ExxonMobile Report
        </h1>
        <p className="text-gray-600">Here's your ExxonMobile Report</p>
      </div>

      {/* Tab Controls */}
      {/* <div className="flex flex-col items-center sm:items-end gap-2">
        <div className="flex bg-white rounded-lg border border-gray-200 shadow-sm justify-center items-center">
          <button
            onClick={handleTodayTabClick}
            className={`px-3 sm:px-4  py-2 rounded-l-lg font-medium transition-colors w-30 sm:w-30  text-sm sm:text-base hover:cursor-pointer ${
              activeTab === "today"
                ? "bg-blue-500 text-white rounded-r-md"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Today
          </button>
          <button
            onClick={handleWeekTabClick}
            className={`px-3 sm:px-4 py-2 rounded-r-lg font-medium transition-colors w-30 sm:w-30 text-sm sm:text-base hover:cursor-pointer ${
              activeTab === "week"
                ? "bg-blue-500 text-white rounded-l-md"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            This Week
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Header;
