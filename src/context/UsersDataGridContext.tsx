import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataGridContextType {
  rowData: any[];
  setRowData: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataGridContext = createContext<DataGridContextType | undefined>(undefined);

export function useDataGrid() {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
}

export function DataGridProvider({ children }: { children: ReactNode }) {
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const value = {
    rowData,
    setRowData,
    loading,
    setLoading
  };

  return (
    <DataGridContext.Provider value={value}>
      {children}
    </DataGridContext.Provider>
  );
}