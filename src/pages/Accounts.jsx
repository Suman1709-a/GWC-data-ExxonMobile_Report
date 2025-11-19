import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import Domo from "ryuu.js";

// eslint-disable-next-line no-unused-vars
function Accounts({ activeCard, setActiveCard, Card, ActionsRenderer }) {
  const [loadingTable, setLoadingTable] = useState(false);
  const [programData, setProgramData] = useState([]);

  const fields = useMemo(
    () => [
      "LSRA",
      "Safeguard_Effectiveness",
      "Is_Effective",
      "Is_Not_Effective",
      "Is_Not_Assessed",
      
    ],
    []
  );

  const fetchProgram = useCallback(async () => {
    try {
      const data = await Domo.get(
        `/data/v1/Exxon_data?groupby=${fields.join()}`
      );
        console.log("program data", data);
      setProgramData(data);
      return data;
    } catch (error) {
      console.error("Error fetching Account data:", error);
      return [];
    }
  }, [fields]);

  const activeTableData = useMemo(() => {
    const data = activeCard.component === "accounts" ? programData : [];
    setLoadingTable(false);
    return data;
  }, [activeCard, programData]);

  useEffect(() => {
    fetchProgram();
  }, [fetchProgram]);
  

  const columnDefs = [
    {
      headerName: "LSRA",
      field: "LSRA",
      cellStyle: { textAlign: "left" },
      minWidth: 350,
        flex: 1,

      width: 150,
      sortable: true,
    },
    {
      headerName: "Effective",
      field: "Is_Effective",
      minWidth: 200,
        flex: 1,

      width: 250,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Not_Effective",
      field: "Is_Not_Effective",
      minWidth: 200,
        flex: 1,

      width: 230,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Not_Assessed",
      field: "Is_Not_Assessed",
      minWidth: 200,
        flex: 1,

      width: 220,
      filter: true,
      sortable: true,
    },
    // {
    //   headerName: "Actions",
    //   minWidth: 200,
    //   width: 200,
    //   sortable: false,
    //   filter: false,
    //   suppressSizeToFit: true,
    //   suppressNavigable: true,
    //   cellRenderer: ActionsRenderer,
    // },
  ];

  const cards = useMemo(() => {
    // const programTotal = programData?.reduce( (sum, item) => sum + (item.Program_Total || 0), 0 );
    const Is_Effective = programData?.reduce(
      (sum, item) => sum + (item.Is_Effective || 0),
      0
    );
    const Is_Not_Effective = programData?.reduce(
      (sum, item) => sum + (item.Is_Not_Effective || 0),
      0
    );
    const Is_Not_Assessed = programData?.reduce(
      (sum, item) => sum + (item.Is_Not_Assessed || 0),
      0
    );
    const pcCount = programData?.reduce(
      (sum, item) => sum + (item.PC_Count || 0),
      0
    );

    return [
      {
        id: "Account",
        title: "Total V&V",
        kpiKey: programData?.length,
        data: {
          "Program specific": {
            // "Program Total": programTotal,
            Effective: Is_Effective,
            Not_Effective: Is_Not_Effective,
          },
          "Coverage specific": {
          Not_Assessed: Is_Not_Assessed,
            PC: pcCount,
          },
        },
      },
    ];
  }, [programData]);

  const handleCardClick = (card) => {
    if (activeCard.component === "accounts" && activeCard.cardId === card.id) {
      setActiveCard({ component: null, cardId: null });
      return;
    }

    setActiveCard({ component: "accounts", cardId: card.id });
  };

  const TableComponent = () => (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 col-span-full">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-900">
          {cards.find((c) => c.id === activeCard.cardId)?.title ||
            "Select a card"}
        </h3>
      </div>

      <div className="p-4">
        {loadingTable ? (
          <div className="flex items-center justify-center h-32 text-gray-500 animate-pulse">
            Loading data...
          </div>
        ) : activeTableData.length > 0 ? (
          <div className="w-full" style={{ height: 530 }}>
            <DataTable
              columnDefs={columnDefs}
              rowData={activeTableData}
              loading={loadingTable}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6 text-left mr-1">
        <h2 className="text-xl font-bold text-gray-900">V&V</h2>
        <p className="text-gray-600 text-sm">
          Everything you need to know about V&V
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      {/* Table */}
      {activeCard.component === "accounts" && <TableComponent />}
    </div>
  );
}

export default Accounts;
