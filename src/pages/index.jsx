import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import Accounts from "./Accounts";
// import Survey from "./Survey";
import { Edit, Eye } from "lucide-react";

function Main() {
  //   const [activeTab, setActiveTab] = useState("today");
  const [activeCard, setActiveCard] = useState({
    component: null,
    cardId: null,
  });

  const handleWeekTabClick = useCallback(async () => {
    // setActiveTab("week");
    setActiveCard({ component: null, cardId: null });
  }, []);

  const handleTodayTabClick = useCallback(async () => {
    // setActiveTab("today");
    setActiveCard({ component: null, cardId: null });
  }, []);

  const ActionsRenderer = (params) => {
    const { platform_url } = params.data;
    const viewLink = `${platform_url}`;
    const editLink = `${platform_url}/edit`;

    return (
      <div className="flex space-x-3 pt-2 items-center">
        <a
          href={viewLink}
          target="_parent"
          rel="noopener noreferrer"
          onClick={() => {
            if (window.FlutterChannel) {
              window.FlutterChannel.postMessage({ link: viewLink });
            } else {
              window.top.postMessage({ link: viewLink }, "*");
            }
          }}
          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-100 flex items-center gap-1 text-xs"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
        </a>
        <a
          href={editLink}
          target="_parent"
          onClick={() => {
            if (window.FlutterChannel) {
              window.FlutterChannel.postMessage({ link: editLink });
            } else {
              window.top.postMessage({ link: editLink }, "*");
            }
          }}
          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 flex items-center gap-1 text-xs"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </a>
      </div>
    );
  };

  const Card = ({ card, onClick }) => {
    const kpiValue = card.kpiKey ?? "N/A";

    return (
      <div
        onClick={onClick}
        className={`cursor-pointer text-left bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex-1 min-w-[250px] transition hover:shadow-md ${
          activeCard.component === "accounts" && activeCard.cardId === card.id
            ? "ring-2 ring-blue-500"
            : ""
        }`}
      >
        {/* Title */}
        <h3 className="text-gray-700 font-medium">{card.title}</h3>

        {/* KPI Value */}
        <p className="mt-3 text-3xl font-bold text-gray-900">{kpiValue}</p>

        {/* Sub-data (Side-by-side layout) */}
        <div className="mt-4 flex justify-between gap-6 text-sm text-gray-700">
          {Object.entries(card.data).map(([section, sectionValues]) => (
            <div key={section} className="flex-1">
              {/* Section Title */}
              <p className="font-semibold mb-1">{section}</p>

              {/* Section Data */}
              <div className="space-y-1">
                {Object.entries(sectionValues).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between text-gray-600"
                  >
                    <span>{label}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // const handleCardClick = (card) => {
  //   if (activeCard.component === "accounts" && activeCard.cardId === card.id) {
  //     setActiveCard({ component: null, cardId: null });
  //     return;
  //   }

  //   setActiveCard({ component: "accounts", cardId: card.id });
  // };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="flex-1 overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <Header
            handleTodayTabClick={handleTodayTabClick}
            handleWeekTabClick={handleWeekTabClick}
            // activeTab={activeTab}
          />
          <Accounts
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            ActionsRenderer={ActionsRenderer}
            Card={Card}
            // activeTab={activeTab}
          />
          {/* <Survey
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            ActionsRenderer={ActionsRenderer}
            Card={Card}
            // activeTab={activeTab}
          /> */}
        </div>
      </div>
    </div>
  );
}
export default Main;
