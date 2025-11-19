import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

function DataTable({ rowData, columnDefs, loading }) {
  const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      // floatingFilter: true,
    },
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    paginationAutoPageSize: false,
    // rowSelection: { mode: "singleRow", enableClickSelection: true },
  };

  return (
    <div
      className="w-full h-full overflow-auto"
      style={{ height: "100%", width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        loading={loading}
        // theme={myTheme}
        // domLayout="normal"
      />
    </div>
  );
}

export default DataTable;
