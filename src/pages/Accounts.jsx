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
      "ID",
    ],
    []
  );

  const fetchProgram = useCallback(async () => {
    try {
      const data = await Domo.get(
        `/data/v1/Exxon_data?groupby=${fields.join()}&unique=ID&fields=${fields.join()}`
      );
      const grouped = {};

      data.forEach((row) => {
        const key = row.ID; // Group only by ID

        if (!grouped[key]) {
          grouped[key] = {
            ...row,
            Is_Effective: 0,
            Is_Not_Effective: 0,
            Is_Not_Assessed: 0,
            LSRA_List: [], // optional: collect LSRA values
          };
        }

        // Count effectiveness
        if (row.Safeguard_Effectiveness === "Is Effective") {
          grouped[key].Is_Effective += 1;
        } else if (row.Safeguard_Effectiveness === "Is Not Effective") {
          grouped[key].Is_Not_Effective += 1;
        } else if (row.Safeguard_Effectiveness === "Is Not Assessed") {
          grouped[key].Is_Not_Assessed += 1;
        }

        // Optional: track all LSRA values for this ID
        if (!grouped[key].LSRA_List.includes(row.LSRA)) {
          grouped[key].LSRA_List.push(row.LSRA);
        }
      });

      const finalResult = Object.values(grouped);
      console.log("Final Result:", finalResult);

      setProgramData(finalResult);
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
    // Count distinct IDs where Safeguard_Effectiveness matches each condition
    const uniqueEffectiveIds = new Set(
      programData
        ?.filter((item) => item.Safeguard_Effectiveness === "Is Effective")
        .map((item) => item.ID)
    );

    const uniqueNotEffectiveIds = new Set(
      programData
        ?.filter((item) => item.Safeguard_Effectiveness === "Is Not Effective")
        .map((item) => item.ID)
    );

    const uniqueNotAssessedIds = new Set(
      programData
        ?.filter((item) => item.Safeguard_Effectiveness === "Is Not Assessed")
        .map((item) => item.ID)
    );

    const Is_Effective = uniqueEffectiveIds.size;
    const Is_Not_Effective = uniqueNotEffectiveIds.size;
    const Is_Not_Assessed = uniqueNotAssessedIds.size;

    return [
      {
        id: "Account",
        title: "Total V&V",
        kpiKey: programData?.length,
        data: {
          "": {
            Effective: Is_Effective,
            "Not Effective": Is_Not_Effective,
            "Not Assessed": Is_Not_Assessed,
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
