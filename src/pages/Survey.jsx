// // src/pages/Survey.jsx
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import DataTable from "../components/DataTable";
// import Domo from "ryuu.js";

// function Survey({ activeCard, setActiveCard, Card, ActionsRenderer }) {
//   const [loadingTable, setLoadingTable] = useState(false);
//   const [surveyData, setSurveyData] = useState([]);

//   const fields = useMemo(
//     () => [
//       "platform_submitted_by",
//       "date_requested",
//       "due_date",
//       "priority",
//       "survey_type",
//       "business_unit",
//       "program",
//       "status",
//     ],
//     []
//   );

//   const fetchSurvey = useCallback(async () => {
//     try {
//       const data = await Domo.get(
//         `/data/v1/surveys_data?groupby=${fields.join()}&unique=platform_submission_id&fields=${fields.join()}`
//       );
//       setSurveyData(data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching Survey data:", error);
//       return [];
//     }
//   }, [fields]);

//   const activeTableData = useMemo(() => {
//     const data = activeCard.component === "surveys" ? surveyData : [];
//     setLoadingTable(false);
//     return data;
//   }, [activeCard, surveyData]);

//   useEffect(() => {
//     fetchSurvey();
//   }, [fetchSurvey]);

//   const columnDefs = [
//     {
//       headerName: "Requester Name",
//       field: "platform_submitted_by",
//       cellStyle: { textAlign: "left" },
//       minWidth: 200,
//       width: 200,
//       sortable: true,
//     },
//     {
//       headerName: "Date Requested",
//       field: "date_requested",
//       minWidth: 150,
//       width: 150,
//       sortable: true,
//     },
//     {
//       headerName: "Due Date",
//       field: "due_date",
//       minWidth: 150,
//       width: 150,
//       sortable: true,
//     },
//     {
//       headerName: "Priority",
//       field: "priority",
//       minWidth: 120,
//       width: 120,
//       filter: true,
//       sortable: true,
//     },
//     {
//       headerName: "Survey Type",
//       field: "survey_type",
//       minWidth: 180,
//       width: 180,
//       filter: true,
//       sortable: true,
//     },
//     {
//       headerName: "Business Unit",
//       field: "business_unit",
//       minWidth: 180,
//       width: 180,
//       filter: true,
//       sortable: true,
//     },
//     {
//       headerName: "Program",
//       field: "program",
//       minWidth: 180,
//       width: 180,
//       filter: true,
//       sortable: true,
//     },
//     {
//       headerName: "Actions",
//       minWidth: 200,
//       width: 200,
//       sortable: false,
//       filter: false,
//       suppressSizeToFit: true,
//       suppressNavigable: true,
//       cellRenderer: ActionsRenderer,
//     },
//   ];
//   console.log("survey data", surveyData);
//   const cards = useMemo(() => {
//     const statusCounts = surveyData?.reduce((acc, item) => {
//       console.log("status", item.status);
//       const status = item.status || "Unknown";
//       acc[status] = (acc[status] || 0) + 1;
//       return acc;
//     }, {});

//     return [
//       {
//         id: "Survey",
//         title: "Total Surveys",
//         kpiKey: surveyData?.length,
//         data: {
//           Status: statusCounts || {},
//         },
//       },
//     ];
//   }, [surveyData]);

//   const handleCardClick = (card) => {
//     if (activeCard.component === "surveys" && activeCard.cardId === card.id) {
//       setActiveCard({ component: null, cardId: null });
//       return;
//     }

//     setActiveCard({ component: "surveys", cardId: card.id });
//   };

//   const TableComponent = () => (
//     <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 col-span-full">
//       <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-base font-semibold text-gray-900">
//           {cards.find((c) => c.id === activeCard.cardId)?.title ||
//             "Select a card"}
//         </h3>
//       </div>

//       <div className="p-4">
//         {loadingTable ? (
//           <div className="flex items-center justify-center h-32 text-gray-500 animate-pulse">
//             Loading data...
//           </div>
//         ) : activeTableData.length > 0 ? (
//           <div className="w-full" style={{ height: 530 }}>
//             <DataTable
//               columnDefs={columnDefs}
//               rowData={activeTableData}
//               loading={loadingTable}
//             />
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-32 text-gray-500">
//             No data available
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="mb-8">
//       {/* Header */}
//       <div className="mb-6 text-left mr-1">
//         <h2 className="text-xl font-bold text-gray-900">Surveys</h2>
//         <p className="text-gray-600 text-sm">
//           Everything you need to know about your Surveys
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {cards.map((card) => (
//           <Card
//             key={card.id}
//             card={card}
//             onClick={() => handleCardClick(card)}
//           />
//         ))}
//       </div>

//       {/* Table */}
//       {activeCard.component === "surveys" && <TableComponent />}
//     </div>
//   );
// }

// export default Survey;
